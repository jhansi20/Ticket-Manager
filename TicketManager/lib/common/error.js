module.exports = {
    UserNotFound: {
        statusCode: 404,
        error: 'User Not Found',
        message: 'Requested user not found'
    },
    CommentNotFound: {
        statusCode: 404,
        error: 'Comment Not Found',
        message: 'Requested Comment not found'
    },
    TicketNotFound: {
        statusCode: 404,
        error: 'Ticket Not Found',
        message: 'Requested Ticket not found'
    },
    UserAlreadyExists: {
        statusCode: 409,
        error: 'User already exists',
        message: 'Userid or Email already exists!'
    },
    UnauthorizedError: {
        statusCode: 401,
        error: 'Unauthorized error',
        message: 'Cannot login'
    },
    CommentNotAdded:{
        statusCode: 409,
        error: 'Comment Not Added',
        message: 'Unable to add comment'
    },
    TicketNotCreated:{
        statusCode: 409,
        error: 'Ticket not created',
        message: 'Unable to create ticket'
    },
    CommentNotUpdated:{
        statusCode: 409,
        error: 'Comment Not Updated',
        message: 'Unable to update the comment'
    },
    TicketNotUpdated:{
        statusCode: 409,
        error: 'Ticket Not Updated',
        message: 'Unable to update the Ticket'
    },
    UserNotUpdated:{
        statusCode: 409,
        error: 'User Not Updated',
        message: 'Unable to update the User'
    },
}