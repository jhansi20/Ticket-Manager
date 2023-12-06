const Joi = require('joi')
let tags = Joi.object().keys({
    tagName: Joi.string().required(),
})
const schemas = {
    UserSchema: Joi.object({
        userid: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
    TicketSchema: Joi.object({
        // ticketid: Joi.string(),
        // title: Joi.string().required(),
        // description: Joi.string().required(),
        // reporter: Joi.string().required(),
        // assignee: Joi.string().required(),
        // category: Joi.string().required(),
        // subCategory: Joi.string().required(),
        // assigneeEmailId: Joi.string().required(),
        // priority: Joi.string().required(),
        // status: Joi.string(),
        // type: Joi.string().required(),
        // attachments: Joi.array().items(Joi.object({
        //     hapi: Joi.object({
        //       filename: Joi.string(),
        //       headers: Joi.object({
        //         'content-type': Joi.string().valid('image/jpeg', 'image/png', 'image/gif'),
        //       }),
        //     }),
        //     encoding: Joi.string(),
        //     _meta: Joi.object({
        //       filename: Joi.string(),
        //       headers: Joi.object({
        //         'content-type': Joi.string().valid('image/jpeg', 'image/png', 'image/gif'),
        //       }),
        //     }),
        //   })),
        //   stringData: Joi.string(),
        // attachments: Joi.object({
        //     filename: Joi.string().required(),
        //     path: Joi.string().required(),
        //     headers: Joi.object({
        //       'content-disposition' : Joi.string().required(),
        //       'content-type' : Joi.string().valid(['image/jpeg']).required(),
        //     }).required(),
        //     bytes: Joi.number().required()
        // })
        }),
    getTicketSchema: Joi.object({
        ticketid: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        reporter: Joi.string().required(),
        assignee: Joi.string().required(),
        category: Joi.string().required(),
        subCategory: Joi.string().required(),
        reporterEmailId: Joi.string().required(),
        priority: Joi.string().required(),
        status: Joi.string().required(),
        type: Joi.string().required(),
        // tags: Joi.array().items(tags).min(1).required(),
        // attachments: Joi.string().required(),
    }),
    CommentSchema: Joi.object({
        userid: Joi.string().required(),
        ticketid: Joi.string().required(),
        // commentid: Joi.number().integer().options({ convert: false }),
        comment: Joi.string().required()

    }),
    getCommentSchema: Joi.object({
        userid: Joi.string().required(),
        ticketid: Joi.string().required(),
        commentid: Joi.number().integer().options({ convert: false }),
        // commentid: Joi.string(),
        comment: Joi.string().required()

    }),
    updateUser: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
    }),
    updateTicket: Joi.object({
        title: Joi.string(),
        assignee: Joi.string(),
        description: Joi.string(),
        status: Joi.string()
    }),
    updateComment: Joi.object({
        comment: Joi.string(),
        ticketid: Joi.string()
    }),
    getComment: Joi.object({
        ticketid: Joi.string()
    }),
    getTicket: Joi.object({
        ticketid: Joi.string(),
        assignee: Joi.string()
    }),
    getUser: Joi.object({
        userid: Joi.string(),
        name: Joi.string(),
        email: Joi.string()
    }),
    updateTicketParam: Joi.object({
        ticketid: Joi.string()
    }),
    updateUserParam: Joi.object({
        userid: Joi.string()
    }),
    updateCommentParam: Joi.object({
        // commentid: Joi.number().integer().options({ convert: false })
        id: Joi.string().required()
    }),
    UserLogin: Joi.object({
        userid: Joi.string().required(),
        password: Joi.string().required()
    })
};
module.exports = schemas;