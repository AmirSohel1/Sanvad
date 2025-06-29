const User = require("../model/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const user = await User.create({ userName, password });

    const token = jwt.sign({ id: user._id, userName }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res
      .cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .status(201)
      .json({
        id: user._id,
        userName: user.userName,
        token,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userLogin = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // console.log(user);
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    // console.log(user);

    res
      .cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .status(200)
      .json({
        id: user._id,
        username: user.userName,
        token,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logoutUser = async (req, res) => {
  res
    .cookie("token", "", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

const people = async (req, res) => {
  const users = await User.find({}, { _id: 1, userName: 1 });
  // console.log(users);
  res.json(users);
};

const profile = async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
};

module.exports = { logoutUser, userLogin, registerUser, people, profile };
