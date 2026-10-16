const cloudinary = require("cloudinary").v2;

console.log("CLOUD:", process.env.CLOUD_NAME);
console.log("KEY:", process.env.CLOUD_KEY);
console.log("SECRET:", process.env.CLOUD_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

module.exports = cloudinary;