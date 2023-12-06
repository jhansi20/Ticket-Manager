
const Errors = require('../common/error'),
  SuccessMessages = require('../common/successMessages'),
  UserService = require('../services/user-service'),
  TicketService = require('../services/ticket-service'),
  CommentService = require('../services/comment-service');

class RouteHandler {
  constructor(applicationData) {
    this.applicationData = applicationData
    this.userService = new UserService(this.applicationData)
    this.ticketService = new TicketService(this.applicationData)
    this.commentService = new CommentService(this.applicationData)
  }
  async userLogin(req, res) {
    const me = this
    try {
      await me.userService.userLogin(req.payload)
      return me.replySuccess(SuccessMessages.LoginSuccess, res)
    } catch (err) {
      return me.replyError(err, res)
    }
  }
  async createTicket(req, res) {
    const me = this
    try {
      await me.ticketService.createTicket(req.payload)
      return me.replySuccess(SuccessMessages.TicketCreated, res)
    } catch (err) {
      return me.replyError(Errors.TicketNotCreated, res)
    }
  }
  async createUser(req, res) {
    const me = this
    try {
      await me.userService.createUser(req.payload)
      return me.replySuccess(SuccessMessages.UserCreated, res)
    } catch (err) {
      return me.replyError(Errors.UserAlreadyExists, res)
    }
  }
  async createComment(req, res) {
    const me = this
    try {
      await me.commentService.createComment(req.payload)
      return me.replySuccess(SuccessMessages.CommentCreated, res)
    } catch (err) {
      return me.replyError(Errors.CommentNotAdded, res)
    }
  }
  async getComment(req, res) {
    const me = this
    try {
      let response = await me.commentService.getComment(req.query)
      return response
    } catch (err) {
      return me.replyError(err, res)
    }
  }
  async getTicket(req, res) {
    const me = this;
    try {
      let response = await me.ticketService.getTicket(req.query)
      return response
    } catch (err) {
      return me.replyError(err, res)
    }
  }
  async getUser(req, res) {
    const me = this;
    try {
      let response = await me.userService.getUser(req.query)
      return response
    }
    catch (err) {
      return me.replyError(err, res)
    }
  }
  async updateComment(req, res) {
    const me = this
    try {
      await me.commentService.updateComment(req.params.id, req.payload)
      return me.replySuccess(SuccessMessages.CommentUpdated, res)
    } catch (err) {
      return me.replyError(Errors.CommentNotUpdated, res)
    }
  }
  async updateTicket(req, res) {
    const me = this
    try {
      console.log(req.payload)
      await me.ticketService.updateTicket(req.params, req.payload)
      console.log('success updating')
      return me.replySuccess(SuccessMessages.TicketUpdated, res)
    } catch (err) {
      return me.replyError(Errors.TicketNotUpdated, res)
    }
  }
  async updateUser(req, res) {
    const me = this;
    try {
      await me.userService.updateUser(req.params, req.payload)
      return me.replySuccess(SuccessMessages.UserUpdated, res)
    } catch (err) {
      return me.replyError(Errors.UserNotUpdated, res)
    }
  }
  replyError(err, res) {
    console.error(err)
    return res.response(err).code(err.statusCode)
  }
  replySuccess(msg, res) {
      return res.response(msg).code(msg.statusCode)
  }

}
module.exports = RouteHandler