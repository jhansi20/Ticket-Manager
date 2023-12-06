const sql = require('../sql/index')
class TicketDbAccess {
    constructor(applicationData) {
        this.db = applicationData.dbConnection
    }
    async createTicket(ticketData) {
        const me = this
        try {
            return await me.db.query(sql.tickets.createTicket, [ticketData, new Date(), new Date()]);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    async getTicketByTicketid(ticketid) {
        const me = this
        return await me.db.query(sql.tickets.getTicketByTicketid, [ticketid]);
    }
    async getTicketByAssignee(assignee) {
        const me = this
        return await me.db.query(sql.tickets.getTicketByAssignee, [assignee]);
    }
    async updateTicket(ticketid, existingData) {
        const me = this
        await me.db.query(sql.tickets.updateByTicketid, [existingData[0].data, new Date(), ticketid])
    }
    async getTicketId() {
        const me = this
        return await me.db.query(sql.ticketidgenerator.getTicketID);
    }
}
module.exports = TicketDbAccess;