class RedisHelper {
    constructor(applicationData) {
        this.applicationData=applicationData
        this.redisClient = this.applicationData.redisClient
    }
    async getKey(key) {
        const me=this
        let cacheResults
        cacheResults = await me.redisClient.get(key);
        if (cacheResults) {
            return JSON.parse(cacheResults);
        }
        return null
    }
    async setKey(key,value) {
        const me=this
        await me.redisClient.del(key)
        await me.redisClient.set(key,value)
    }
}
module.exports = RedisHelper