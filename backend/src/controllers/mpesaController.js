require("dotenv").config();
const MpesaService = require("../services/MpesaService");
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
        const response = await MpesaService.stkPushService(phone, amount,req);     
        if(response.ResponseCode == "0"){
            // save data to database
            const CheckoutRequestID = response.CheckoutRequestID;
            const MerchantRequestID = response.MerchantRequestID
            return res.status(200).json({CheckoutRequestID,MerchantRequestID})
        }  
        
   }
       catch(error) {            
           if(error){
            return res.status(400).json(error)
           }
          
    };
}
const callBack = async(req, res) => {    
    try {
        const callbackData = req.body;
        const result_code = callbackData.Body.stkCallback.ResultCode;
        if (result_code !== 0) {
            const CheckoutRequestID = callbackData.Body.stkCallback.CheckoutRequestID;
            const payment = await Payment.findOne({
                where: {CheckoutRequestID}
            });
            if (payment) {
                await payment.update({
                    ResultDesc: callbackData?.Body?.stkCallback?.ResultDesc,
                    status:'Failed',
                });
            }
            return;
        } else {

            const CheckoutRequestID = callbackData.Body.stkCallback.CheckoutRequestID;
            const payment = await Payment.findOne({
                where: { CheckoutRequestID }
            });

            if (!payment) { }
            // If the result code is 0, the transaction was completed
            const body = await req?.body?.Body?.stkCallback?.CallbackMetadata;
        
            // Get amount
            const amountObj = await body.Item.find(obj => obj.Name === 'Amount');
            const amount = await amountObj.Value;
        
            // Get Mpesa code
            const codeObj = await body.Item.find(obj => obj.Name === 'MpesaReceiptNumber');
            const mpesaCode = await codeObj.Value;
        
            // Get phone number
            const phoneNumberObj = await body.Item.find(obj => obj.Name === 'PhoneNumber');
            const phone = await phoneNumberObj.Value;

            await payment.update({
                "ResultDesc":await callbackData?.Body?.stkCallback?.ResultDesc,
                "MpesaReceiptNumber":mpesaCode,
                "status":"Paid"
            });            
        }
       
    } catch (error) {
        // return res.status(500).json(error.message);
        console.log(error.response);
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
        const response = await MpesaService.stkPushStatusService(CheckoutRequestID, req);

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

