const express = require("express");
const { newSubscribe, getSubscribers, deleteSubscriber, unSubscribe } = require("../controllers/subscribersController");
const router = express.Router();
const isAdmin = require("../middleware/adminMiddleware")
const protect = require("../middleware/authmiddleware")
router.post("/create", newSubscribe);
router.get("/", isAdmin, getSubscribers);
router.post("/delete", [isAdmin,protect], deleteSubscriber);
router.post("/unsubscribe",[isAdmin,protect],  unSubscribe);
module.exports = router;