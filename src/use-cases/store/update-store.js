module.exports = function makeUpdateStore({ storesDb }) {
    return async function updateStore({
      id,
      name,
      userId,
      description,
      visibility,
      location,
      modifiedAt,
    }) {
      try {
        const updatedStore = await storesDb.updateStore({
          id,
          name,
          userId,
          description,
          visibility,
          location,
          modifiedAt,
        });
  
        return updatedStore;
      } catch (error) {
        console.log("Error during store update:", error);
        throw error;
      }
    };
  };
