'use strict';
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const RegisterRoutes = require('./lib/routes/register-public-routes')
const pgp = require('pg-promise')();
const redis = require('redis')
const fs = require('fs');
const config = require('./lib/common/config')
class AppLoader {
    constructor() {
        this.applicationData = {}

    }
    async createHapiServer() {
        const me = this;
        let server = Hapi.server(config.hapiConfig);
        await server.register(Inert);
        await server.start();
        me.applicationData.server = server
    }
    async createDbconnection() {
        const me = this;
        const cn = config.dbConfig;
        let dbConnection = await pgp(cn);
        me.applicationData.dbConnection = dbConnection

    }
    async createRedisClient() {
        const me = this
        let redisClient = redis.createClient(config.redisConfig)
        redisClient.on("error", (error) => console.error(`Error : ${error}`));
        await redisClient.connect();
        me.applicationData.redisClient = redisClient
    }

    async bootApp() {
        const me = this
        await me.createHapiServer()
        await me.createDbconnection()
        await me.createRedisClient()
        let registerPublicRoutes = new RegisterRoutes(me.applicationData)
        await registerPublicRoutes.registerRoutes(me.applicationData.server)
    }
}
module.exports = AppLoader
