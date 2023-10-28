const express = require("express");
const { newSubscribe, getSubscribers, deleteSubscriber, unSubscribe } = require("../controllers/subscribersController");
const router = express.Router();
router.post("/create", newSubscribe);
router.get("/", getSubscribers);
router.post("/delete", deleteSubscriber);
router.post("/unsubscribe", unSubscribe);
module.exports = router;