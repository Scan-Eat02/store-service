module.exports = function makeGetUserStores({ storesDb }) {
    return async function getUserStores({
        userId,
    }) {
      try {
        // Update the store with additional fields
        const userStores = await storesDb.getUserStores(userId);
  
        return userStores;
      } catch (error) {
        console.log("Error during store get by user:", error);
        throw error;
      }
    };
  };
