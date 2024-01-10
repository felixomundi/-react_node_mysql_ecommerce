require("dotenv").config();
const MpesaService = require("../services/MpesaService");
const ngrok = require("ngrok");
async function ngrokConnect(){
    try {
        var url = await ngrok.connect({
            proto: 'http', 
            addr: 5000,
            authtoken:process.env.AUTH_TOKEN,
           });
           console.log(url)
    } catch (error) {
        console.log(error);
    }

} ngrokConnect();

const generateToken = async(req, res, next) => {    
   try {       
    const response = await MpesaService.generateTokenService();
    if (response) {
        req.token = response.access_token;         
      }        
    next() 
    } catch (error) {
        return res.status(400).json(error);
    }
}
const stkPush = async (req, res) => {   
    try {
        const phone = req.body.phone.substring(1);
        const amount = req.body.amount;     
        if(!phone){
            return res.status(400).json({
                message:"Provide Mpesa Phone Number"
            })
        }
        if(!amount){
            return res.status(400).json({
                message:"Provide Amount to Pay"
            })
        }   
        const response = await MpesaService.stkPushService(phone, amount);
        console.log(response)
        //   return res.status(200).json(response.data.ResponseDescription);
        return  res.status(200).json(response)
 
   }
       catch(error) {
            console.log(error)
           return res.status(400).json(error.response.data.errorMessage)
           //error.message
    };
}
const callBack = async(req, res) => {    
    try {
        // const callBackData = req.body.Body.stkCallback;
        // console.log(callBackData);       
            // const data = callBackData.Body.stkCallback.CallbackMetadata;           
            // const amount = data.Item[0].Value;
            // const transaction = data.Item[1].Value;
            // const balance = data.Item[2].Value;
            // const date = data.Item[3].Value;        
            // const phone = data.Item[4].Value;  
            console.log(req.body)          
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const stkPushStatus = async(req, res)=>{
    try {
        const CheckoutRequestID = req.body.CheckoutRequestID
        if(!CheckoutRequestID){
            return res.status(400).json({
                message:"Please Provide CheckoutRequestID"
            })
        }
        const response = await MpesaService.stkPushStatusService(CheckoutRequestID);

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