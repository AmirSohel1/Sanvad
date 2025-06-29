const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // Token expires in 1 hour
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
