const RouteHandler = require('./routeHandler');
const schemas = require('../common/schemas')
class RegisterPublicRoutes {
  constructor(applicationData) {
    this.routeHandler = new RouteHandler(applicationData)
  }
  registerRoutes(server) {
    const me = this;
    server.route({
      method: 'POST',
      path: '/login',
      handler: (req, res) => me.routeHandler.userLogin(req, res),
      options: {
        validate: {
          payload: schemas.UserLogin
        }
      }
    })
    server.route({
      method: 'GET',
      path: '/getUser',
      handler: (req, res) => me.routeHandler.getUser(req, res),
      options: {
        validate: {
          query: schemas.getUser
        },
        response: {
          schema: schemas.UserSchema,
          failAction: 'log'
        }
      }
    });
    server.route({
      method: 'GET',
      path: '/getComment',
      handler: (req, res) => me.routeHandler.getComment(req, res),
      options: {
        validate: {
          query: schemas.getComment
        },
        response: {
          schema: schemas.getCommentSchema,
          failAction: 'log'
        }
      }
    })
    server.route({
      method: 'GET',
      path: '/getTicket',
      handler: (req, res) => me.routeHandler.getTicket(req, res),
      options: {
        validate: {
          query: schemas.getTicket
        },
        response: {
          schema: schemas.TicketSchema,
          failAction: 'log'
        }
      }
    })
    server.route({
      method: 'POST',
      path: '/createUser',
      handler: (req, res) => me.routeHandler.createUser(req, res),
      options: {
        validate: {
          payload: schemas.UserSchema
        }
      },
    })
    server.route({
      method: 'POST',
      path: '/createTicket',
      handler: (req, res) => me.routeHandler.createTicket(req, res),
      options: {
        payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data',
          maxBytes: 2 * 1024 * 1024, // Set a reasonable limit for file size
          multipart: true,
        },
        // validate: {
        //   payload: schemas.TicketSchema
        // }
      }
    })
    server.route({
      method: 'POST',
      path: '/createComment',
      handler: (req, res) => me.routeHandler.createComment(req, res),
      options: {
        validate: {
          payload: schemas.CommentSchema
        }
      }
    })
    server.route({
      method: 'PUT',
      path: '/updateUser/{userid}',
      handler: (req, res) => me.routeHandler.updateUser(req, res),
      options: {
        validate: {
          params: schemas.updateUserParam,
          payload: schemas.updateUser
        }
      }
    })
    server.route({
      method: 'PUT',
      path: '/updateTicket/{ticketid}',
      handler: (req, res) => me.routeHandler.updateTicket(req, res),
      options: {
        validate: {
          params: schemas.updateTicketParam,
          payload: schemas.updateTicket
        }
      }
    })
    server.route({
      method: 'PUT',
      path: '/updateComment/{id}',
      handler: (req, res) => me.routeHandler.updateComment(req, res),
      options: {
        validate: {
          params: schemas.updateCommentParam,
          payload: schemas.updateComment
        }
      }
    })
  }

}
module.exports = RegisterPublicRoutes