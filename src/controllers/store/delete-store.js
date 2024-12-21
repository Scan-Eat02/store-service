function makeDeleteStoreAction({ deleteStore, formatResponse, formatError }) {
    return async function deleteStoreController(req, res) {
        try {
            // Step 2: Extract necessary fields from the request body
            const storeData = {
                id: req.body['id'],
                name: req.body['name'],
                userId: req.body['userId'],
            };
            console.log(storeData);

            const result = await deleteStore(storeData);
            console.log('Store deletion successful');

            return res.status(200).json(formatResponse({
                statusCode: 200,
                body: { message: 'Store deletion successful', store: result },
            }));
        } catch (error) {
            console.log('Error in deleteStoreController:', error);
            return res.status(400).json(formatError({ error }));
        }
    };
}

module.exports = makeDeleteStoreAction;