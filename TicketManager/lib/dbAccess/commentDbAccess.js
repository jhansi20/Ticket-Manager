const sql = require('../sql/index')
class CommentDbAccess {
    constructor(applicationData) {
        this.db = applicationData.dbConnection
    }
    async createComment(commentData) {
        const me = this;
        await me.db.query(sql.comments.createComment, [commentData, new Date(),new Date()]);
    }
    async getCommentByTicketid(ticketid) {
        const me = this;
        return await me.db.query(sql.comments.getCommentByTicketid, [ticketid]);
    }
    async getCommentById(id) {
        const me = this;
        return await me.db.query(sql.comments.getCommentById, [id]);
    }
    async getCommentByUserid(userid) {
        const me = this;
        return await me.db.query(sql.comments.getCommentByUserid, [userid]);
    }
    async updateComment(id,existingData) {
        const me = this;
        await me.db.query(sql.comments.updateCommentByTicketid, [existingData[0].data, new Date(), id])
    }
}
module.exports = CommentDbAccess;