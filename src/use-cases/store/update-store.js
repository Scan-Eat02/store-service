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
        // Update the store with additional fields
        const updatedStore = await storesDb.updateStore({
          id,
          name,
          userId,
          description,
          visibility,
          location,
          modifiedAt, // Set modified_at to current timestamp
        });
  
        return updatedStore;
      } catch (error) {
        console.log("Error during store update:", error);
        throw error;
      }
    };
  };
