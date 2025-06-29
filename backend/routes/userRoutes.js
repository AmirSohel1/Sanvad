const express = require("express");
const router = express.Router();
const {
  logoutUser,
  userLogin,
  registerUser,
  people,
  profile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", userLogin);
router.post("/signup", registerUser);

router.post("/logout", logoutUser);

router.get("/profile", profile);
router.get("/people", people);

module.exports = router;
