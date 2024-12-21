module.exports = function makeGetAllStores({ storesDb }) {
    return async function getAllStores() {
      try {
        // Update the store with additional fields
        const allStores = await storesDb.getAllStores();
  
        return allStores;
      } catch (error) {
        console.log("Error during store get all:", error);
        throw error;
      }
    };
  };
