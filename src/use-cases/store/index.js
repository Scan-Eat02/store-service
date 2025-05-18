const allDbs = require('../../data-access');

const makeCreateStore = require('./create-store');
const createStore = makeCreateStore({
    storesDb: allDbs.storesDb,
});

const makeDeleteStore = require('./delete-store');
const deleteStore = makeDeleteStore({
    storesDb: allDbs.storesDb,
});

const makeUpdateStore = require('./update-store');
const updateStore = makeUpdateStore({
    storesDb: allDbs.storesDb,
});

const makeGetUserStores = require('./get-user-stores');
const getUserStores = makeGetUserStores({
    storesDb: allDbs.storesDb,
});

const makeGetAllStores = require('./get-all-stores');
const getAllStores = makeGetAllStores({
    storesDb: allDbs.storesDb,
});

const makeCreateStoreEventRequest = require('./create-store-event-request');
const createStoreEventRequest = makeCreateStoreEventRequest({
    storeRequestsDb: allDbs.storeRequestsDb,
});

const makeAcceptStoreEventRequest = require('./accept-store-event-request');
const acceptStoreEventRequest = makeAcceptStoreEventRequest({
    storeRequestsDb: allDbs.storeRequestsDb,
    eventsDb: allDbs.eventsDb,
});


module.exports = Object.freeze({
    createStore,
    deleteStore,
    updateStore,
    getUserStores,
    getAllStores,
    createStoreEventRequest,
    acceptStoreEventRequest,
});
