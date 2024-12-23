const formatResponse = require('../format-response').formatResponse;
const formatError = require('../format-response').formatError;

const {
    createStore,
    deleteStore,
    updateStore,
    getUserStores,
    getAllStores
} = require('../../use-cases').storeUseCases;

const makeCreateStoreAction = require('./create-store');
const createStoreAction = makeCreateStoreAction({
    createStore,
    formatResponse,
    formatError,
});

const makeDeleteStoreAction = require('./delete-store');
const deleteStoreAction = makeDeleteStoreAction({
    deleteStore,
    formatResponse,
    formatError,
});

const makeUpdateStoreAction = require('./update-store.js');
const updateStoreAction = makeUpdateStoreAction({
    updateStore,
    formatResponse,
    formatError,
});

const makeGetUserStoresAction = require('./get-user-stores');
const getUserStoresAction = makeGetUserStoresAction({
    getUserStores,
    formatResponse,
    formatError,
});

const makeGetAllStoresAction = require('./get-all-stores');
const getAllStoresAction = makeGetAllStoresAction({
    getAllStores,
    formatResponse,
    formatError,
});

module.exports = Object.freeze({
    createStoreAction,
    deleteStoreAction,
    updateStoreAction,
    getUserStoresAction,
    getAllStoresAction,
});
