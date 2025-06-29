const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { messageData } = require("../controllers/messageController");

router.get("/:id", messageData);

module.exports = router;
