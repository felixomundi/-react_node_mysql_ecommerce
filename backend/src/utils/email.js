"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    // secure: false,
    auth: {    
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized:false,
    },
});
  
async function sendEmails(name,email,subject,message) {
   try {
     await transporter.sendMail({
        from: `${name} ${email}`, 
        to: process.env.EMAIL_USER, 
        subject: subject,        
        html: message, 
      });       
          
   } catch (error) {
       
   }
  
}
  
module.exports = {
    sendEmails

}

