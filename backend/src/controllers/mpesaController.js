const axios = require("axios");
require("dotenv").config();
// const ngrok = require("ngrok");
// async function ngrokConnect(){
//     try {
//         var url = await ngrok.connect({
//             proto: 'http', 
//             addr: 5000,
//            });
//     } catch (error) {
//         console.log(error);
//     }

// } ngrokConnect();
const date = new Date(); 
const TIMESTAMP = date.getFullYear()+ 
        ("0" + (date.getMonth() + 1)).slice(-2) + 
        ("0" + (date.getDate() + 1)).slice(-2) + 
        ("0" + (date.getHours() + 1)).slice(-2) + 
        ("0" + (date.getMinutes() + 1)).slice(-2) + 
        ("0" + (date.getSeconds() + 1)).slice(-2);   
const SHORTCODE = process.env.MPESA_SHORTCODE;
const PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const PASSWORD = new Buffer.from(SHORTCODE + PASSKEY + TIMESTAMP).toString("base64");    
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;


const generateToken = async(req, res, next) => {    
   try {   
    const auth = new Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
    let   token;
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
      return response.data;    
  
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const stkPush = async (req, res) => {   
    try {
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount; 
        const data =  { 
        "BusinessShortCode": SHORTCODE,
        "Password": PASSWORD,
        "Timestamp": TIMESTAMP,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": `254${phone}`,
        "PartyB": SHORTCODE,
        "PhoneNumber": `254${phone}`,
        "CallBackURL": process.env.MPESA_CALLBACK_URL,
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
const stkPushStatus = async(req, res)=>{
    try {
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";      
        const response = await axios.post(url,
            {
                "BusinessShortCode":SHORTCODE,
                "Password":PASSWORD,
                "Timestamp":TIMESTAMP,
                'CheckoutRequestID':req.params.id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",            }
            }        
            );
        return response;
    } catch (error) {
        if(error){
            return error
        }
    }

}
module.exports = {
    generateToken,
    stkPush,
    callBack,
    stkPushStatus
}