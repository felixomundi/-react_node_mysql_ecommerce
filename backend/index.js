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

app.use(cors({
    origin: ['http://localhost:3000'],
    
}));
// app.use(express.json());
// app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    
app.use('/api/v1/products', require('./routes/productRoute.js'));
app.use('/api/v1/users', require('./routes/userRoute'));
app.use("/api/v1/cart", require("./routes/cartRoute"));
app.use("/api/v1/coupon", require("./routes/couponTypeRoute"));
app.use("/api/v1/codes", require("./routes/couponCodeRoute"));
app.use("/api/v1/orders", require("./routes/orderRoute.js"));

app.listen(
   PORT,
    () => {
        console.log(`Server running on ${PORT}`);
        
    }
);
