const formatResponse = require('../format-response').formatResponse;
const formatError = require('../format-response').formatError;

const {
    createStore,
} = require('../../use-cases').storeUseCases;

const makeStoreCreateAction = require('./create-store');
const storeCreateAction = makeStoreCreateAction({
    createStore,
    formatResponse,
    formatError,
});

module.exports = Object.freeze({
    storeCreateAction,
});
