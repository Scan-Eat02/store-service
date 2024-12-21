module.exports = function makeCreateStore({ storesDb }) {
    return async function createStore({
      name,
      description,
      userId,
      visibility,
      location,
    }) {
      try {  
        // Create the new store with additional fields
        const newStore = await storesDb.createStore({
          name,
          description,
          userId,
          visibility,
          location,
          isDisabled: false,
        });
  
        return newStore;
      } catch (error) {
        console.log("Error during store creation:", error);
        throw error;
      }
    };
  };
  