const express = require("express");
const { newSubscribe, getSubscribers, deleteSubscriber } = require("../controllers/subscribersController");
const router = express.Router();
router.post("/create", newSubscribe);
router.get("/", getSubscribers);
router.post("/delete", deleteSubscriber);
module.exports = router;