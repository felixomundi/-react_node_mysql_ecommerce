const express = require("express");
const { newSubscribe, getSubscribers, deleteSubscriber, unSubscribe } = require("../controllers/subscribersController");
const router = express.Router();
const isAdmin = require("../middleware/adminMiddleware")
router.post("/create", newSubscribe);
router.get("/", isAdmin, getSubscribers);
router.post("/delete", deleteSubscriber);
router.post("/unsubscribe", unSubscribe);
module.exports = router;