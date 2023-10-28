const {Subscribers} = require("../models")
class SubscriberService {


    static  async findByEmail(email) {
     return   await Subscribers.findOne({
            where: {
             email
         }
     })       
    }

    static async createSubscriber(data) {       
        return await Subscribers.create(data);
    }
    static async findAll() {
        return await Subscribers.findAll()
    }
    static async deleteOne(id) {
        await Subscribers.destroy();
    }

}

module.exports = SubscriberService;