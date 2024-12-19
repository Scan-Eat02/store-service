const STORE_TABLE = 'store';

function makeStoresDb({ cockroach, UnknownError }) {
    return Object.freeze({
        findStoreByNameAndUserId,
        createStore,
    });

    // Find store by name and user_id
    async function findStoreByNameAndUserId({ name, user_id }) {
        const query = `
            SELECT id, name, user_id, visibility, location
            FROM "${STORE_TABLE}"
            WHERE name = $1 AND user_id = $2;
        `;
        const values = [name, user_id];

        try {
            const result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null; // No store found
            }
            return result.rows[0];
        } catch (error) {
            console.log('Error in findStoreByNameAndUserId:', error);
            throw new UnknownError();
        }
    }

    // Create a new store
    async function createStore({
        name,
        description,
        user_id,
        visibility,
        location,
        isDisabled
    }) {
        const query = `
            INSERT INTO "${STORE_TABLE}" 
            (name, description, user_id, visibility, location, is_disabled)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, user_id, visibility, location, is_disabled;
        `;
        const values = [name, description, user_id, visibility, location, isDisabled];

        try {
            const result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.log('Error in createStore:', error);
            throw new UnknownError();
        }
    }
}

module.exports = makeStoresDb;
