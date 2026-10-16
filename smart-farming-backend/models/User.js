const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: String,
});

module.exports = mongoose.model("User", userSchema);