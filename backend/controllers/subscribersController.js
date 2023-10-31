"use strict"

const SubscriberService = require("../services/Subscribers")
const {User} = require("../models")
async function newSubscribe(req, res) {
    try {
        const { name, email } = req.body;
        if (!name) {
            return res.status(400).json({
                message:"Subscriber name is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                message:"Subscriber email is required"
            })
        }
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        if (!validateEmail(email)) {
            return res.status(400).json({
                message:'Please Enter a valid email address.'
            })
            }
        const subscriber = await SubscriberService.findByEmail(email);
        if (subscriber) {
            return res.status(400).json({
                message: "Subscriber Exists"
            })
        }
        let data = {
            name,
            email
        }
        const newSubscriber = await SubscriberService.createSubscriber(data);
            return res.status(201).json({
                subscriber: newSubscriber,
                message:"Subscribed Successfully",
            })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}

async function getSubscribers(req, res) { 
    try {
        const subscribers = await SubscriberService.findAll();
        return res.status(200).json({
            subscribers
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to fetch subscribers"
        })
    }
}
 
async function deleteSubscriber(req, res) { 
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({
                message:"Subscriber Email is required"
             }) 
        }
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        if (!validateEmail(email)) {
            return res.status(400).json({
                message:'Please Enter a valid email address.'
            })
        }

        const user = await User.findOne({
            where:{id:req.user.id}
        })
        if (user.role === "admin") {
        const subscriber = await SubscriberService.findByEmail(email);
        if(!subscriber){
            return res.status(200).json({
               message:"Subscriber Not Found"
            })
        }
        await subscriber.destroy();
        return res.status(200).json({
            message:"Subscriber deleted"
         })
        }

        else if (user.role === "user") {
            if (user.email !== email) {
                return res.status(400).json({
                   message:"You are not subscribed"
               }) 
            }
        const subscriber = await SubscriberService.findByEmail(email);
        if(!subscriber){
            return res.status(200).json({
               message:"Subscriber Not Found"
            })
        }
        await subscriber.destroy();
        return res.status(200).json({
            message:"Subscriber deleted"
         })
        }      
        
    } catch (error) {
        return res.status(500).json({
            message:"Failed to delete subscriber"
        })
    }
}

async function unSubscribe(req, res) {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({
                message:"Subscriber Email is required"
            })
        }
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        if (!validateEmail(email)) {
            return res.status(400).json({
                message:'Please Enter a valid email address.'
            })
            }
        const subscriber = await SubscriberService.findByEmail(email);
        if (!subscriber) {
            return res.status(400).json({
                message:"Subscriber not found"
            })  
        }
        if (subscriber.status === "Inactive") {
            await subscriber.update({
                status:"Active"
            })
            return res.status(200).json({
                message:"You hare  subscribed to our newsletter"
            })    
        }

        await subscriber.update({
            status:"Inactive"
        })

        return res.status(200).json({
            message: "UnSubscribed successfully",
            subscriber
        })  

    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong"
        })  
    }
    
}

async function createOrUpdateSubscription(req, res) {
    try {

        const subscriber = await SubscriberService.findByEmail(req.user.mail);
        return res.status(200).json({
            subscriber
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to fetch subscriber"
        })
    }
    
}

async function getSubscriber(req, res) {
    try {
       
        const subscriber = await SubscriberService.findByEmail(req.user.email);
        return res.status(200).json({
            subscriber
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to fetch subscriber"
        })
    }
    
}

module.exports = {
    newSubscribe,
    getSubscribers,
    deleteSubscriber,
    unSubscribe,
    createOrUpdateSubscription,
    getSubscriber
}