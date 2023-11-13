const express = require("express");
const cors =require("cors");
// const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const app = express();

global.__basedir = __dirname;

const whitelist = ['http://localhost:8000'];

const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
          callback(new Error('Not Allowed by cors'), false)    
      }
    },
    optionSuccessStatus:200,
    
}
// configure cors
app.use(cors(corsOptions));
// pass json data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    
app.use('/api/v1/products', require('./routes/productRoute.js'));
app.use('/api/v1/users', require('./routes/userRoute'));
app.use("/api/v1/cart", require("./routes/cartRoute"));
app.use("/api/v1/coupon", require("./routes/couponTypeRoute"));
app.use("/api/v1/codes", require("./routes/couponCodeRoute"));
app.use("/api/v1/orders", require("./routes/orderRoute.js"));
app.use("/api/v1/subscribers", require("./routes/subscribeRoute.js"));
app.use("/api/v1/contact", require("./routes/contactRoute.js"));

app.listen(
   PORT,
    () => {
        console.log(`Server running on ${PORT}`);
        
    }
);
