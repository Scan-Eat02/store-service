function makeGetUserStoresAction({ getUserStores, formatResponse, formatError }) {
    return async function getUserStoresController(req, res) {
        try {
            // Step 2: Extract necessary fields from the request body
            const storeData = {
                userId: req.body['userId'],
            };
            
            console.log('Get User Stores Request:', storeData);

            const result = await getUserStores(storeData);
            console.log('Stores get by user successful');

            return res.status(200).json(formatResponse({
                statusCode: 200,
                body: { message: 'Stores get by user successful', stores: result },
            }));
        } catch (error) {
            console.log('Error in getUserStoresController:', error);
            return res.status(400).json(formatError({ error }));
        }
    };
}

module.exports = makeGetUserStoresAction;
