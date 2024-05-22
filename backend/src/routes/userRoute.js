const express = require('express');
const { registerUser, loginUser,   
updateUser,
changePassword, 
resetPassword, 
getUsers,
addUser, 
forgotPassword} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put("/profile", protect, updateUser);
router.patch('/change-password', protect, changePassword);
router.post('/forgot-password',forgotPassword);
router.post("/resetpassword/:resetToken", resetPassword);
router.post("/new", addUser)
router.get("/", getUsers);
module.exports = router;
