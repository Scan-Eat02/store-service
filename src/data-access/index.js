const { Pool } = require('pg');
const config = require('../config');
const { UnknownError } = require('../exceptions');

// Import Solr from utilities package
let Solr;
try {
  Solr = require('scan_eat_utils').Solr;
} catch (error) {
  console.warn('utilities package not found. Solr functionality will be disabled.');
}

// Create the pool with CockroachDB-specific configurations
const cockroach = new Pool({
    user: config.cockroach.username,
    host: config.cockroach.host,
    database: config.cockroach.dbName,
    password: config.cockroach.password,
    port: config.cockroach.port,
    poolSize: config.cockroach.poolSize,
    // isSSL: config.cockroach.ssl,
});

// Create Solr connection
let solr;
if (config.solr && Solr) {
  solr = new Solr({
    host: config.solr.host,
    port: config.solr.port,
    protocol: config.solr.protocol,
  });
}

// Make all DBs here
const makeStoresDb = require('./stores-solr-db');
const storesDb = makeStoresDb({ solr, UnknownError });

const makeEventsDb = require('./eventsdb');
const eventsDb = makeEventsDb({ cockroach, UnknownError });

const makeStoreRequestsDb = require('./storerequestsdb');
const storeRequestsDb = makeStoreRequestsDb({ cockroach, UnknownError });

// Export all DBs
const dbs = {
    storesDb,
    eventsDb,
    storeRequestsDb
};
module.exports = { cockroach, ...dbs };
