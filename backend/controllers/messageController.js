const Message = require("../model/Message");
const jwt = require("jsonwebtoken");

async function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token;
    if (!token) {
      return reject(new Error("No token provided"));
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) {
        return reject(new Error("Invalid token"));
      }
      resolve(userData);
    });
  });
}

const messageData = async (req, res) => {
  const { id: userId } = req.params; // Destructure `id` properly

  try {
    const userData = await getUserDataFromRequest(req);
    console.log(userData);

    const ourUserId = userData.id; // Make sure it's `id`, not `_id`

    const messages = await Message.find({
      sender: { $in: [userId, ourUserId] },
      recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { messageData };
