module.exports = function makeDeleteStore({ storesDb }) {
    return async function deleteStore({
      id,
      name,
      userId,
    }) {
      try {  
        // Create the new store with additional fields
        const deletedStore = await storesDb.deleteStore({
          id,
          name,
          userId,
          isDisabled: true,
        });
  
        return deletedStore;
      } catch (error) {
        console.log("Error during store deletion:", error);
        throw error;
      }
    };
  };
  