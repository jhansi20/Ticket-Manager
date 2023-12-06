
const sql = require('../sql/index')
const bcrypt = require('bcrypt');
class UserDbAccess {
    constructor(applicationData) {
        this.db = applicationData.dbConnection
    }

    async createUser(payload) {
        const me = this;
        const userData = payload
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedPassword
        await me.db.query(sql.users.createUser, [userData, new Date(), new Date()]);
    }
    async getUserByEmail(email) {
        const me = this
        return await me.db.query(sql.users.getUserByEmail, email);
    }
    async getUserByName(name) {
        const me = this
        return await me.db.query(sql.users.getUserByName, name);
    }
    async getUserByUserid(userid) {
        const me = this
        return await me.db.query(sql.users.getUserByUserid, userid);
    }
    async updateUser(userid, newUserData) {
        const me = this;
        await me.db.query(sql.users.updateUser, [newUserData[0].data, new Date(), userid])
    }
    async getUserByIdorEmail(userid,email){
        const me = this;
        return await me.db.query(sql.users.getUserByIdorEmail, [userid,email])
    }
    async getUsers(){
        const me=this;
        return await me.db.query(sql.users.getUsers,[])
    }
}
module.exports = UserDbAccess;