const Errors = require('../common/error')
const SuccessMessages = require('../common/successMessages')
const UserDbAccess = require('../dbAccess/userDbAccess')
const RedisHelper = require('../helper/redis-helper')
const bcrypt = require('bcrypt');
class UserService {
    constructor(applicationData) {
        this.applicationData = applicationData
        this.userDb = new UserDbAccess(applicationData)
        this.redisHelper = new RedisHelper(applicationData)
    }
    async userLogin(payload) {
        let hashedPassword
        const { userid, password } = payload;
        let user = await this.userDb.getUserByUserid(userid)
        try {
            if ((user).length)
                hashedPassword = user[0].data.password
            else
                throw Errors.UserNotFound
            const match = await bcrypt.compare(password, hashedPassword);
            if (!match) {
                console.log('not matched')
                throw Errors.UnauthorizedError
            }
        } catch (err) {
            throw err
        }
    }
    async getUser(queryParams) {
        const me = this;
        try {
            if (!queryParams.length) {
                const result= await me.userDb.getUsers()
                return result
            }
            else {
                let cacheResults = await me.redisHelper.getKey(queryParams.userid)
                if (cacheResults != null) {
                    return cacheResults
                }
                else {
                let result
                if (queryParams.userid)
                    result = await this.userDb.getUserByUserid(queryParams.userid)
                else if (queryParams.name)
                    result = await this.userDb.getUserByName(queryParams.name)
                else if (queryParams.email)
                    result = await this.userDb.getUserByEmail(queryParams.email)
                if ((result).length) {
                    const userid = result[0].data.userid
                    await me.redisHelper.setKey(userid, JSON.stringify(result[0]))
                    return result[0]
                }
                else
                    throw Errors.UserNotFound
                }
            }
        }
        catch (err) {
            throw err
        }
    }

    async updateUser(params, payload) {
        const me = this
        try {
            let existingData = await this.userDb.getUserByUserid(params.userid)
            if (payload.name)
                existingData[0].data.name = payload.name
            if (payload.email)
                existingData[0].data.email = payload.email
            if ((existingData).length) {
                let userid = params.userid
                await me.userDb.updateUser(userid, existingData)
                const cacheResults = await me.redisHelper.getKey(userid);
                if (cacheResults) {
                    await me.redisHelper.setKey(userid, JSON.stringify(existingData[0]));
                }
            }
            else
                throw Errors.UserNotFound
        } catch (err) {
            throw err
        }
    }
    async createUser(payload) {
        try {
            const userByIdorEmail = await this.userDb.getUserByIdorEmail(payload.userid, payload.email)
            if ((userByIdorEmail).length)
                throw Errors.UserAlreadyExists
            await this.userDb.createUser(payload)
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}
module.exports = UserService