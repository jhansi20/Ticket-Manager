const redis = require('redis')
let cors = require('cors');
module.exports = {
    dbConfig: {
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'root',
        password: 'root',
        max: 30
    },
    redisConfig: {
        host: redis,
        port: 6379
    },
    hapiConfig: {
        port: 3003,
        host: 'localhost',
        "routes": {
            "cors": true
        }
    }
}