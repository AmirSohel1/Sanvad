const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure sender is always provided
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure recipient is always provided
    },
    text: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
