function makeStoreEventRequestAction({createStoreEventRequest, formatResponse, formatError}) {
    return async function storeEventRequestAction({ req, res }) {
        try {
            const { eventId, storeId, userId } = req.body;

            if (!eventId || !storeId) {
                return res.status(400).json(formatError({ error: 'Event ID and Store ID are required'}));
            }

            const result = await createStoreEventRequest({
                eventId,
                storeId,
                userId,
            });

            return res.status(201).json(formatResponse({
                message: 'Store event request created successfully',
                data: result,
            }));
        } catch (error) {
            console.error('Error in createStoreEventRequestAction:', error);
            return res.status(400).json(formatError({ error }));
        }
    }
}

module.exports = makeStoreEventRequestAction; 