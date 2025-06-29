const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not authorized, no token provided." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found." });
      }
      console.log(user);

      next();
    } catch (err) {
      console.error("Authorization Middleware Error:", err);
      return res.status(401).json({
        message:
          err.name === "TokenExpiredError"
            ? "Token expired, please log in again."
            : "Authorization failed.",
      });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided." });
  }
};

module.exports = { protect };
