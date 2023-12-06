const load = require('./load-sql')

let sqlFileHash = {};

sqlFileHash['tickets'] = {
    createTicket: load('./tickets/create.sql'),
    getTicketByTicketid: load('./tickets/getTicketByTicketid.sql'),
    getTicketByAssignee: load('./tickets/getTicketByAssignee.sql'),
    updateByTicketid: load('./tickets/updateByTicketid.sql')
}
sqlFileHash['users'] = {
    createUser: load('./users/create.sql'),
    getUserByUserid: load('./users/getUserByUserid.sql'),
    getUserByName: load('./users/getUserByName.sql'),
    getUserByEmail: load('./users/getUserByEmail.sql'),
    updateUser: load('./users/updateUser.sql'),
    getUserByIdorEmail: load('./users/getUserByIdorEmail.sql'),
    getUsers: load('./users/getUsers.sql'),
}
sqlFileHash['comments'] = {
    createComment: load('./comments/create.sql'),
    getCommentByTicketid: load('./comments/getCommentByTicketid.sql'),
    getCommentById: load('./comments/getCommentById.sql'),
    getCommentByUserid: load('./comments/getCommentByUserid.sql'),
    updateCommentByTicketid: load('./comments/updateCommentByTicketid.sql')
}
sqlFileHash['ticketidgenerator'] = {
    getTicketID: load('./ticketID/getTicketId.sql')
}
module.exports = sqlFileHash
