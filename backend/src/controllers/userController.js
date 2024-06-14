const jwt = require('jsonwebtoken');
const {User,Token} = require('./../../database/models')
// const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const dotenv = require('dotenv');
const { Op } = require('sequelize');
const { mail } = require('../utils/email');
dotenv.config();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  })
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json("Please add all fields");
  }

  if (!validateEmail(email)) {
    return res.status(400).json('Please Enter a valid email address.')
    }
  if (password.length < 6) {
    return  res.status(400).json("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ where:{email:email} });

  if (userExists) {
    return  res.status(400).json("Email already taken");
    // throw new Error("Email has already been registered");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  //   Generate Token
  const token = generateToken(user.id);
  
  if (user) {
    const { id, name, email,  phone,role } = user;
    return  res.status(201).json({
      id,
      name,
      email,     
      phone,       
      token,
      role,
    
    });
  } else {
    return res.status(400).json("Invalid user data");
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
  return  res.status(400).json("Please add email and password");
  }

  // Check if user exists
  const user = await User.findOne({
    where: {
    email:email
  } });

  if (!user) {
   return res.status(400).json("User not found, please signup");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user.id);

  // Send HTTP-only cookie
  // res.cookie("token", token, {
  //   path: "/",
  //   httpOnly: true,
  //   expires: new Date(Date.now() + 1000 * 86400), // 1 day
  //   sameSite: "lax",
  //   secure: true,
  // });

  if (user && passwordIsCorrect) {
    const { id, name, email, phone,role } = user;
  return  res.status(200).json({
      id,
      name,
      email,    
      phone,      
      token,
      role,
    
    });
  } else {
   return res.status(400).json("Invalid email or password");
  }
};


// Update User
const updateUser = async (req, res) => {

  try {
    const { name } = req.body;
 
  const user = await User.findOne({
    where: {
        id: req.user.id,
      }
   });

  if(user) {
       
     const updatedUser = await user.update(
      { name}
    );
    return res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,      
      phone: updatedUser.phone,
      token: generateToken(updatedUser.id),
      role:updatedUser.role,
    });
  } else {
   return res.status(404).json("User not found");
  }
  } catch (error) {
    return res.status(500).json(error.message);
    
  }
};

const changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const user = await User.findOne({
          where: {
            id: req.user.id
          }
      });  

  if (!user) {
    return res.status(400).json({
    message:"User Not Found Please signup",
  })
  }
  //Validate
  if (!current_password) {
    return res.status(400).json({
     message:"Please add current  password",
   });
    }
    
    if (!new_password) {
      return res.status(400).json({
       message:"Please add current  password",
     });
    }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(current_password, user.password);

  // Save new password
  if (passwordIsCorrect) {   
    await user.update({new_password});
   return  res.status(200).json({     
      message: "Password changed successfully"
    });
  } else {
    return res.status(400).json({
     message:"Old password is incorrect",
   });
  }
  } catch (error) {
    console.log(error);
  
 }
};

const forgotPassword = async (req, res) => {  
  try {

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message:'Please provide email address'})
    }
  const user = await User.findOne({
    where: {
      email: email,
    }
  });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist please signup!⚠️"
    });
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({
    where: {
      userId: user.id
    }
  });

    if (token === null) { } else {      
      await token.destroy();
    }
    

  // Create Reste Token
  let resetToken =  crypto.randomBytes(32).toString("hex") + user.id;
 

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save Token to DB
  await Token.create({
    userId: user.id,
    token: hashedToken,
    createdAt: Date.now(),
    expiryDate: Date.now() + 30 * (60 * 1000), // 30 mins
  });


  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30 minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>${process.env.APP_NAME} Team</p>
    `;
  const subject = "Password Reset Request"; 
    // await sendEmail(subject, message, send_to, sent_from);
   await mail(user.email, subject, message);
    return res.status(200).json({ message: "Check your email address to forget your password" });
  
  } catch (error) {   
    console.log(error);
    return res.status(400).json({
      message:"Email not sent, please try again"      
    });
  }
};


const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({message:'Please Provide Password'})
    }
    const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiryDate: {[Op.gt]: Date.now() },
  });

  if (!userToken) {
    return res.status(400).json({
   message:"Invalid or Expired Token"  
   })
   
  }

  // Find user
    const user = await User.findOne({
    where:{id:userToken.userId}
  });
  if (!user) {
    return res.status(400).json({
      message:"User not found"
    })
    
  }
  // Hash the new password before saving
  user.password = await bcrypt.hash(password, 10); // Assuming you're using bcrypt for password hashing
  await user.save();

  // Delete the token from the database after successful password reset
  await userToken.destroy();

  return res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
  } catch (error) {
    return res.status(400).json({
     message:"Something went wrong"
   }) 
  }
});

const getUsers = async (req, res) => {
  const users = await User.findAll()
  if(users){
    return res.status(200).json(users)
  } else {
    return res.status(404).json("No users found in the database")
  }
}

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    return res.status(400).json("Please add all fields");
  }

  if (!validateEmail(email)) {
    return res.status(400).json('Please Enter a valid email address.')
    }
  if (password.length < 6) {
    return  res.status(400).json("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ where:{email:email} });

  if (userExists) {
    return  res.status(400).json("Email already taken");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { id, name, email,  phone,role } = user;
    return  res.status(201).json({
      id,
      name,
      email,     
      phone,     
      role,
    
    });
  } else {
    return res.status(400).json("Invalid user data");
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  addUser

};