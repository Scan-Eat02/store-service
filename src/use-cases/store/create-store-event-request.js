function makeCreateStoreEventRequest({storeRequestsDb}) {
    return async function createStoreEventRequest({ eventId, storeId, userId }) {
        try {
            const result = await storeRequestsDb.createStoreEventRequest({
                eventId,
                storeId,
                userId,
            });

            if (!result) {
                throw new Error('Failed to create store event request');
            }

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = makeCreateStoreEventRequest; 