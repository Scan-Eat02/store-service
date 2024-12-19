function makeCreateStoreAction({ createStore, formatResponse, formatError }) {
    return async function createStoreController(req, res) {
        try {
            // Step 2: Extract necessary fields from the request body
            const storeData = {
                name: req.body['name'],
                description: req.body['description'],
                user_id: req.body['user_id'],
                visibility: req.body['visibility'],
                location: req.body['location'],
            };
            console.log(storeData);

            const result = await createStore(storeData);
            console.log('Store creation successful');

            return res.status(201).json(formatResponse({
                statusCode: 201,
                body: { message: 'Store creation successful', store: result },
            }));
        } catch (error) {
            console.log('Error in createStoreController:', error);
            return res.status(400).json(formatError({ error }));
        }
    };
}

module.exports = makeCreateStoreAction;