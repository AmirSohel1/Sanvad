const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
dotenv.config();
connectDB();
const app = express();
const ws = require("ws");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://192.168.")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

const Message = require("./model/Message");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);

const server = app.listen(5000);

const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  function notifyAboutOnlinePeople() {
    [...wss.clients].forEach((client) => {
      // console.log(client);
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((c) => ({
            userId: c.userId,
            userName: c.userName,
          })),
        })
      );
    });
  }

  connection.isAlive = true;
  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlinePeople();
      console.log("dead");
    }, 1000);
  }, 5000);

  connection.on("pong", () => {
    clearTimeout(connection.deathTimer);
  });

  // Read username from the cookie for this connection
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.trim().startsWith("token="));
    if (tokenCookieString) {
      const token = tokenCookieString.split("=")[1];
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
          if (!err && userData) {
            connection.userId = userData.id;
            connection.userName = userData.userName;
          }
          // console.log(userData);
          notifyAboutOnlinePeople();
        });
      }
    }
  }

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { recipient, text } = messageData;

    console.log("Received Message Data:", messageData);
    console.log("Sender ID:", connection.userId);
    console.log("Recipient ID:", recipient);

    if (!recipient || !text) {
      console.error("❌ Recipient or text missing!");
      return;
    }

    // 🚨 Prevent self-messaging
    if (recipient === connection.userId) {
      console.error("❌ Error: Sender and recipient are the same!");
      return;
    }

    try {
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient: recipient,
        text,
      });

      console.log("✅ Message saved to DB:", messageDoc);

      // Send message to the recipient
      [...wss.clients]
        .filter((c) => c.userId === recipient)
        .forEach((c) =>
          c.send(
            JSON.stringify({
              text,
              sender: connection.userId,
              recipient,
              _id: messageDoc._id,
            })
          )
        );
    } catch (error) {
      console.error("❌ Error saving message:", error);
    }
  });
});
