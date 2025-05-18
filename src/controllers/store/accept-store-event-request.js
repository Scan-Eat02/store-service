function makeAcceptStoreEventRequestAction({acceptStoreEventRequest, formatResponse, formatError}) {
    return async function acceptStoreEventRequestAction({ req, res }) {
        try {
            const { eventId, storeId, userId } = req.body;

            if (!eventId || !storeId) {
                return res.status(400).json(formatError({ error: 'Event ID and Store ID are required'}));
            }

            const result = await acceptStoreEventRequest({
                eventId,
                storeId,
                userId,
            });

            return res.status(200).json(formatResponse({
                message: 'Store event request accepted successfully',
                data: result,
            }));
        } catch (error) {
            console.error('Error in acceptStoreEventRequestAction:', error);
            return res.status(400).json(formatError({ error }));
        }
    }
}

module.exports = makeAcceptStoreEventRequestAction; 