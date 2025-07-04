function makeGetAllStoresAction({ getAllStores, formatResponse, formatError }) {
    return async function getAllStoresController(req, res) {
        try {
            const search = req.query.search || null;

            const result = await getAllStores({ search });
            console.log('Stores get all successful');

            return res.status(200).json(formatResponse({
                statusCode: 200,
                body: { message: 'Stores get all successful', stores: result },
            }));
        } catch (error) {
            console.log('Error in getAllStoresController:', error);
            return res.status(400).json(formatError({ error }));
        }
    };
}

module.exports = makeGetAllStoresAction;
