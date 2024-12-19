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
};

module.exports = config;
