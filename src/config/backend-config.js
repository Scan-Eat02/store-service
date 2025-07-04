const config = {
    cockroach: {
        host: '172.19.1.1',
        port: 26257,
        dbName: 'evt_manager',
        username: 'root',
        password: '',
        poolSize: 10,
        commonDbName: 'evt_manager',
    },
    solr: {
        host: 'localhost',
        port: 8983,
        protocol: 'http',
    },
    caching: {
        enabled: 'Y',
        server_type: 'redis',
        options: {
            host: '127.0.0.1',
            port: '6379',
        },
    },
    userStoresCache: {
        life_time: 300, // 5 minutes in seconds
    },
};

module.exports = config;
