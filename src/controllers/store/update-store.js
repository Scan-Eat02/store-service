function makeUpdateStoreAction({ updateStore, formatResponse, formatError }) {
    return async function updateStoreController(req, res) {
        try {
            // Step 2: Extract necessary fields from the request body
            const storeData = {
                id: req.body['id'],
                name: req.body['name'],
                userId: req.body['userId'],
                description: req.body['description'],
                visibility: req.body['visibility'],
                location: req.body['location'],
                modifiedAt: new Date().toISOString(), // Set modified_at to current timestamp
            };
            
            console.log('Update Store Request:', storeData);

            const result = await updateStore(storeData);
            console.log('Store updation successful');

            return res.status(200).json(formatResponse({
                statusCode: 200,
                body: { message: 'Store updation successful', store: result },
            }));
        } catch (error) {
            console.log('Error in updateStoreController:', error);
            return res.status(400).json(formatError({ error }));
        }
    };
}

module.exports = makeUpdateStoreAction;
