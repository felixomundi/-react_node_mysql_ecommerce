const axios = require("axios");
require("dotenv").config();
const ngrok = require("ngrok");
async function ngrokConnect(){
    try {
        var url = await ngrok.connect({
            proto: 'http', 
            addr: 5000,
           });
    } catch (error) {
        console.log(error);
    }
    
} ngrokConnect();
  

const generateToken = async(req, res, next) => {
    const secret = process.env.CONSUMER_SECRET;
    const consumer = process.env.CONSUMER_KEY;
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    try {
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: {
                Authorization: `Basic ${auth}`,
            }
        });
        if (response.data) {
            token = response.data.access_token;
         
    }
  next() 
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const stkPush = async (req, res) => {
   
    try {
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;
    const date = new Date();
    const timestamp = date.getFullYear() + 
        ("0" + (date.getMonth() + 1)).slice(-2) + 
        ("0" + (date.getDate() + 1)).slice(-2) + 
        ("0" + (date.getHours() + 1)).slice(-2) + 
        ("0" + (date.getMinutes() + 1)).slice(-2) + 
        ("0" + (date.getSeconds() + 1)).slice(-2)
    const shortcode = "174379";
    const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64");    
    const data =  {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": `254${phone}`,
        "PartyB": shortcode,
        "PhoneNumber": `254${phone}`,
        "CallBackURL":"https://9a9f-41-209-51-2.ngrok.io/callback",
        "AccountReference": `254${phone}`,
        "TransactionDesc": "Testing mpesa simulation"
    }
    const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            data, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",            }
        }
        );
   
       console.log(response)
    //   return res.status(200).json(response.data.ResponseDescription);
     return  res.status(200).json(response.data)
 
   }
       catch(error) {
            console.log(error)
           return res.status(400).json(error.response.data.errorMessage)
           //error.message
    };
}

const callBack = async(req, res) => {    
    try {
        const callBackData = req.body.Body.stkCallback;
        console.log(callBackData);       
            // const data = callBackData.Body.stkCallback.CallbackMetadata;           
            // const amount = data.Item[0].Value;
            // const transaction = data.Item[1].Value;
            // const balance = data.Item[2].Value;
            // const date = data.Item[3].Value;        
            // const phone = data.Item[4].Value;            
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    generateToken,
    stkPush,
    callBack,
}