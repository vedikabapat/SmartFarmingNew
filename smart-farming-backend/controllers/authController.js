const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Send OTP (mock)
exports.sendOTP = async (req, res) => {
    console.log("BODY:", req.body);
    
  const { phone } = req.body;

  const otp = "1234"; // mock OTP

  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({ phone, otp });
  } else {
    user.otp = otp;
  }

  await user.save();

  res.json({ message: "OTP sent", otp }); // show OTP for testing
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
};