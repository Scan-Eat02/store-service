const COLLECTION_NAME = 'stores';

function makeStoresDb({ solr, UnknownError }) {
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
        try {
            // Generate a unique ID for the store
            const storeId = generateUniqueId();
            const currentTime = new Date().toISOString();
            
            const preDocument = {
                id: storeId,
                name: name,
                description: description,
                user_id: userId,
                visibility: visibility,
                location: location,
                is_disabled: isDisabled,
                created_at: currentTime,
                modified_at: currentTime,
                type: 'store'
            };

            const response = await solr.add({
                core: COLLECTION_NAME,
                document: preDocument,
                queryParams: { commit: true, overwrite: true },
            });

            if (!response || !response['adds'] || !response['adds'].length) {
                return null;
            }

            // Return the created store data
            return {
                id: storeId,
                name: name,
                user_id: userId,
                visibility: visibility,
                location: location,
                is_disabled: isDisabled
            };
        } catch (error) {
            console.log('Error in createStore:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function deleteStore({ id, name, userId, isDisabled }) {
        try {
            const response = await solr.deleteByIds({
                core: COLLECTION_NAME,
                ids: [id],
                queryParams: { commit: true, overwrite: true },
            });

            if (!response || !response['responseHeader'] || response['responseHeader'].status !== 0) {
                return null;
            }

            return {
                id: id,
                name: name,
                user_id: userId,
                is_disabled: true
            };
        } catch (error) {
            console.log('Error in deleteStore:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function updateStore({ id, name, userId, description, visibility, location, modifiedAt }) {
        try {
            // First get the existing store to verify ownership and get missing fields
            const existingStore = await getStoreById({ id, userId });
            if (!existingStore) {
                return null;
            }

            const preDocument = {
                id: id,
                name: name,
                description: description,
                user_id: userId,
                visibility: visibility,
                location: location,
                is_disabled: existingStore.is_disabled,
                created_at: existingStore.created_at,
                modified_at: modifiedAt,
                type: 'store'
            };

            const response = await solr.patch({
                core: COLLECTION_NAME,
                id: id,
                document: preDocument,
                queryParams: { commit: true, overwrite: true },
            });

            if (!response || !response['responseHeader'] || response['responseHeader'].status !== 0) {
                return null;
            }

            return {
                id: id,
                name: name,
                user_id: userId,
                description: description,
                visibility: visibility,
                location: location,
                modified_at: modifiedAt
            };
        } catch (error) {
            console.log('Error in updateStore:', error);
            throw new UnknownError({ message: error });
        }
    }

    async function getAllStores({ search = null } = {}) {
        try {
            const queryOptions = {
                core: COLLECTION_NAME,
                document: {
                    query: search ? `name:*${search}*` : '*:*',
                },
                queryParams: { 
                    start: 0, 
                    rows: 1000,
                    fl: 'id,name,user_id,description,location,modified_at'
                },
            };
    
            const response = (await solr.query(queryOptions)).response;
    
            if (!response || !response.docs) {
                return [];
            }
    
            return response.docs;
        } catch (error) {
            console.log('Error in getAllStores:', error);
            throw new UnknownError({ message: error });
        }
    }
    

    async function getUserStores({ userId }) {
        try {
            const queryOptions = {
                core: COLLECTION_NAME,
                document: {
                    query: '*:*',
                    filter: [
                        `user_id:"${userId}" AND is_disabled:false AND type:"store"`
                    ],
                },
                queryParams: { 
                    start: 0, 
                    rows: 1000,
                    fl: 'id,name,user_id,description,visibility,location,modified_at'
                },
            };

            const response = (await solr.query(queryOptions)).response;

            if (!response || !response.docs) {
                return [];
            }

            return response.docs;
        } catch (error) {
            console.log('Error in getUserStores:', error);
            throw new UnknownError({ message: error });
        }
    }

    // Helper function to get store by ID and user ID
    async function getStoreById({ id, userId }) {
        try {
            const queryOptions = {
                core: COLLECTION_NAME,
                document: {
                    query: '*:*',
                    filter: [
                        `id:"${id}" AND user_id:"${userId}" AND type:"store"`
                    ],
                },
                queryParams: { start: 0, rows: 1 },
            };

            const response = (await solr.query(queryOptions)).response;

            if (!response || !response.docs || !response.docs.length) {
                return null;
            }

            return response.docs[0];
        } catch (error) {
            console.log('Error in getStoreById:', error);
            throw new UnknownError({ message: error });
        }
    }

    // Helper function to generate unique ID
    function generateUniqueId() {
        return 'store_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

module.exports = makeStoresDb;
