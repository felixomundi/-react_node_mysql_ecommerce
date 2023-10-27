const express = require("express");
const { generateToken, stkPush, callBack } = require("../controllers/mpesaController");

const router = express.Router();
router.get("/token", generateToken)
router.post("/stk", generateToken, stkPush)
router.post("/callback", callBack)
module.exports = router;