const EVENT_TABLE = 'Event';

function makeEventsDb({ cockroach, UnknownError }) {
    return Object.freeze({
        acceptStoreToEvent,
    });

    async function acceptStoreToEvent({ eventId, storeId, userId }) {
        try {
            const query = `
                UPDATE ${EVENT_TABLE}
                SET 
                    store_ids = array_append(store_ids, $1::UUID),
                    store_count = COALESCE(array_length(store_ids, 1), 0) + 1
                WHERE id = $2
                    AND NOT ($1 = ANY(store_ids))  -- Prevent duplicate store
                RETURNING id, name, user_id, store_ids, store_count;
            `;
            const values = [storeId, eventId];

            const result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.log('Error in joinStoreToEvent:', error);
            throw new UnknownError({ message: error });
        }
    } 
}

module.exports = makeEventsDb;
