const express = require("express");
const { createOrder, userOrders, getOrder } = require("../controllers/orderController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
router.post("/create", protect, createOrder);
router.get("/user/orders", protect, userOrders);
router.get("/user/orders/findById/:id", protect, getOrder);

module.exports = router;