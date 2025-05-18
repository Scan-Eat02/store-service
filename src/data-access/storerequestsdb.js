const STORE_REQUESTS_TABLE = 'event_store_requests';
const EVENT_TABLE = 'event';

function makeStoreRequestsDb({ cockroach, UnknownError }) {
    return Object.freeze({
        createStoreEventRequest,
        acceptStoreEventRequest,
    });

    async function createStoreEventRequest({ eventId, storeId, userId }) {
        try {
            // First check if the event belongs to the user
            const eventCheckQuery = `
                SELECT id FROM ${EVENT_TABLE}
                WHERE id = $1 AND user_id = $2;
            `;
            const eventCheckValues = [eventId, userId];

            const eventCheckResult = await cockroach.query(eventCheckQuery, eventCheckValues);
            if (eventCheckResult.rows.length) {
                throw new Error('Event belongs to the same user');
            }

            // Check if request already exists
            const existingRequestQuery = `
                SELECT id FROM ${STORE_REQUESTS_TABLE}
                WHERE event_id = $1 AND store_id = $2 AND status = 'pending' AND responded_by = $3;
            `;
            const existingRequestValues = [eventId, storeId, storeId];
            
            const existingRequest = await cockroach.query(existingRequestQuery, existingRequestValues);
            if (existingRequest.rows.length) {
                throw new Error('Request already exists');
            }

            // Create new request
            const query = `
                INSERT INTO ${STORE_REQUESTS_TABLE}
                (event_id, store_id, status, responded_by)
                VALUES ($1, $2, 'pending', $3)
                RETURNING *;
            `;
            const values = [eventId, storeId, storeId];

            const result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.log('Error in createStoreEventRequest:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function acceptStoreEventRequest({ eventId, storeId, userId }) {
        try {
            let query = `
            SELECT id, status 
            FROM ${STORE_REQUESTS_TABLE}
            WHERE event_id = $1 AND store_id = $2 AND status = 'pending' AND responded_by = $3;
            `;
            let values = [eventId, storeId, storeId];

            let result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null;
            }

            query = `
            UPDATE ${STORE_REQUESTS_TABLE}
            SET status = 'accepted', 
                updated_at = NOW() 
            WHERE id = $1 
            RETURNING *;
            `;
            values = [result.rows[0].id];

            result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.log('Error in acceptStoreEventRequest:', error);
            throw new UnknownError({ message: error });
        }
    }
}

module.exports = makeStoreRequestsDb; 