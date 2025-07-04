module.exports = function makeGetUserStores({ storesDb, cache }) {
    return async function getUserStores({
        userId,
    }) {
      try {
        // If cache is available, use it to fetch/store user stores
        if (cache) {
          return await cache.fetch({
            key: `user_stores:${userId}`,
            lifetime: 300, // 5 minutes cache lifetime
            fetchFunction: async () => {
              const userStores = await storesDb.getUserStores({ userId });
              return userStores;
            },
          });
        } else {
          // Fallback to direct database call if cache is not available
          const userStores = await storesDb.getUserStores({ userId });
          return userStores;
        }
      } catch (error) {
        console.log("Error during store get by user:", error);
        throw error;
      }
    };
  };
