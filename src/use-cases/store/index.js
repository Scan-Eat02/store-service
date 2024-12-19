const { AlreadyExistsError } = require('../../exceptions');
const allDbs = require('../../data-access');

const makeCreateStore = require('./create-store');
const createStore = makeCreateStore({
    storesDb: allDbs.storesDb,
    AlreadyExistsError
});

module.exports = Object.freeze({
    createStore
});
