const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: Number,
  username: String,
  firstName: String,
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);