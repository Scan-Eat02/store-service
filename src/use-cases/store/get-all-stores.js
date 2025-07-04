module.exports = function makeGetAllStores({ storesDb }) {
  return async function getAllStores({ search = null } = {}) {
      try {
          const allStores = await storesDb.getAllStores({ search });
          return allStores;
      } catch (error) {
          console.log("Error during store get all:", error);
          throw error;
      }
  };
};
