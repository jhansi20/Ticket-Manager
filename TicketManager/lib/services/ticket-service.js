const Errors = require('../common/error')
const TicketDbAccess = require('../dbAccess/ticketDbAccess')
const RedisHelper = require('../helper/redis-helper')
const fs = require('fs');
const Path = require('path');
class TicketService {
    constructor(applicationData) {
        this.applicationData = applicationData
        this.ticketDb = new TicketDbAccess(applicationData)
        this.redisHelper = new RedisHelper(applicationData)
    }
    async createTicket(payload) {
        const me = this
        try {

            payload.status = "open"
            // const images = payload['attachments[]'];
            // console.log(images)
            // if (!fs.existsSync('./')) {
            //   fs.mkdirSync('./uploads');
            // }
      
            // // Process each uploaded image
            // const uploadedFiles = [];
            // for (const image of images) {
            //   const { filename, headers } = image.hapi;
            //   const fileExtension = filename.split('.').pop();
            //   const newFilename = `${Date.now()}.${fileExtension}`;
            //   const path = `/home/ecom-pulaparthij/Documents/TicketManager/lib/services/uploads/${newFilename}`;
      
            //   const fileStream = fs.createWriteStream(path);
            
      
            // //   Save the file
            //   await new Promise((resolve, reject) => {
            //     image.pipe(fileStream);
      
            //     image.on('end', () => {
            //       uploadedFiles.push({
            //         filename: newFilename,
            //         contentType: headers['content-type'],
            //         path,
            //       });
            //       resolve();
            //     });
      
            //     image.on('error', (err) => {
            //       reject(err);
            //     });
            //   });
            // }
      
            // return { uploadedFiles };
            await this.ticketDb.createTicket(payload)
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    
    
    async getTicket(queryParams) {
        const me = this;
        try {
            let cacheResults = null
            if (queryParams.ticketid) {
                cacheResults = await me.redisHelper.getKey(queryParams.ticketid)
            }
            if (cacheResults != null) {
                return cacheResults
            }
            else {
                let result
                if (queryParams.ticketid)
                    result = await this.ticketDb.getTicketByTicketid(queryParams.ticketid)
                else if (queryParams.assignee) {
                    result = await this.ticketDb.getTicketByAssignee(queryParams.assignee)
                }
                if ((result).length) {
                    const ticketid = result[0].data.ticketid
                    await me.redisHelper.setKey(ticketid, JSON.stringify(result[0]))
                    return result
                }
                else {
                    throw Errors.TicketNotFound
                }
            }
        } catch (err) {
            throw err
        }
    }
    async updateTicket(params, payload) {
        const me = this
        try {
            const ticketid = params.ticketid
            let existingData
            existingData = await this.ticketDb.getTicketByTicketid(ticketid)
            if (existingData.length) {
                if (payload.assignee)
                    existingData[0].data.assignee = payload.assignee
                 if (payload.title)
                    existingData[0].data.title = payload.title
                 if (payload.description)
                    existingData[0].data.description = payload.description
                 if (payload.status)
                    existingData[0].data.status = payload.status
                await me.ticketDb.updateTicket(ticketid, existingData)
                const cacheResults = await me.redisHelper.getKey(ticketid);
                if (cacheResults) {
                    await me.redisHelper.setKey(ticketid, JSON.stringify(existingData[0]));
                }
            }
            else
                throw Errors.TicketNotFound
        } catch (err) {
            throw err
        }
    }
}
module.exports = TicketService