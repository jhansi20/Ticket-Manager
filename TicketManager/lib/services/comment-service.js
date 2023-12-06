const Errors = require('../common/error')
const CommentDbAccess = require('../dbAccess/commentDbAccess')
class CommentService {
    constructor(applicationData) {
        this.applicationData = applicationData
        this.commentDb = new CommentDbAccess(applicationData)
    }
    async getComment(queryParams) {
        try {
            let result;
            if (queryParams.ticketid)
                result = await this.commentDb.getCommentByTicketid(queryParams.ticketid)
            else if (queryParams.userid)
                result = await this.commentDb.getCommentByUserid(queryParams.userid)
            if ((result).length)
                return result
            else
                throw Errors.CommentNotFound
        } catch (err) {
            throw err
        }
    }
    async createComment(payload) {
        try {
            await this.commentDb.createComment(payload)
        } catch (err) {
            console.error(err)
            throw err
        }
    }
    async updateComment(id, payload) {
        const me = this
        try {
            let existingCommentData = await me.commentDb.getCommentById(id)
            if ((existingCommentData).length){
                existingCommentData[0].data.comment = payload.comment
                await me.commentDb.updateComment(id,existingCommentData)
            }
            else
                throw Errors.CommentNotFound
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}
module.exports = CommentService