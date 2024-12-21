const STORE_TABLE = 'store';

function makeStoresDb({ cockroach, UnknownError }) {
    return Object.freeze({
        createStore,
        deleteStore,
        updateStore,
        getAllStores,
        getUserStores,
    });

    // Create a new store
    async function createStore({
        name,
        description,
        userId,
        visibility,
        location,
        isDisabled
    }) {
        const query = `
            INSERT INTO ${STORE_TABLE}
            (name, description, user_id, visibility, location, is_disabled)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, user_id, visibility, location, is_disabled;
        `;
        const values = [name, description, userId, visibility, location, isDisabled];

        try {
            const result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.log('Error in createStore:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function deleteStore({ id, name, userId, isDisabled }) {
        const query = `
            UPDATE ${STORE_TABLE}
            SET is_disabled = $1
            WHERE id = $2 AND name = $3 AND user_id = $4
            RETURNING id, name, user_id, is_disabled;
        `;
        const values = [isDisabled, id, name, userId];

        try {
            const result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null; // No store found with the given criteria
            }
            return result.rows[0]; // Return the updated store
        } catch (error) {
            console.log('Error in deleteStore:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function updateStore({ id, name, userId, description, visibility, location, modifiedAt }) {
        const query = `
            UPDATE ${STORE_TABLE}
            SET 
                name = $1,
                description = $2,
                visibility = $3,
                location = $4,
                modified_at = $5
            WHERE id = $6 AND user_id = $7
            RETURNING id, name, user_id, description, visibility, location, modified_at;
        `;
        const values = [name, description, visibility, location, modifiedAt, id, userId];

        try {
            const result = await cockroach.query(query, values);
            if (!result.rows.length) {
                return null; // No store found with the given criteria
            }
            return result.rows[0]; // Return the updated store
        } catch (error) {
            console.log('Error in updateStore:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function getAllStores() {
        const query = `
            SELECT id, name, user_id, description, location, modified_at
            FROM ${STORE_TABLE}
            WHERE is_disabled = false AND visibility = 'public';
        `;
    
        try {
            const result = await cockroach.query(query);
            return result.rows; // Return all matching stores
        } catch (error) {
            console.log('Error in getAllStores:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function getUserStores({ userId }) {
        const query = `
            SELECT id, name, user_id, description, visibility, location, modified_at
            FROM ${STORE_TABLE}
            WHERE user_id = $1 AND is_disabled = false;
        `;
        const values = [userId];
    
        try {
            const result = await cockroach.query(query, values);
            return result.rows; // Return all matching stores for the user
        } catch (error) {
            console.log('Error in getUserStores:', error);
            throw new UnknownError({ message: error });
        }
    }    
}

module.exports = makeStoresDb;
