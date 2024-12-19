module.exports = function makeCreateStore({ storesDb, AlreadyExistsError }) {
    return async function createStore({
      name,
      description,
      user_id,
      visibility,
      location,
    }) {
      try {
        // Check if a store with the same name and user_id already exists
        const existingStore = await storesDb.findStoreByNameAndUserId({ name, user_id });
  
        if (existingStore) {
          console.log(`Store already exists with name: ${name} for user: ${user_id}`);
          throw new AlreadyExistsError("EX-00005", "Store already exists.");
        }
  
        // Create the new store with additional fields
        const newStore = await storesDb.createStore({
          name,
          description,
          user_id,
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
  