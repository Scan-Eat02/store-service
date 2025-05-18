function makeAcceptStoreEventRequest({storeRequestsDb, eventsDb}) {
    return async function acceptStoreEventRequest({ eventId, storeId, userId }) {
        try {
            const requestResult = await storeRequestsDb.acceptStoreEventRequest({
                eventId,
                storeId,
                userId,
            });

            if (!requestResult) {
                throw new Error('Failed to accept store event request');
            }

            const eventResult = await eventsDb.acceptStoreToEvent({
                eventId,
                storeId,
                userId,
            });

            if (!eventResult) {
                throw new Error('Failed to update event with store information');
            }

            return {
                request: requestResult,
                event: eventResult
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = makeAcceptStoreEventRequest;