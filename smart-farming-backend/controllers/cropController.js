exports.detectDisease = async (req, res) => {
  try {
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      disease: "Leaf Blight",
      symptoms: "Yellowing leaves, brown spots",
      treatment: "Use copper fungicide",
      imageUrl: `http://localhost:5001/uploads/${req.file.filename}`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
/*
const cloudinary = require("../services/cloudinary");

// Upload + Detect Disease
exports.detectDisease = async (req, res) => {
  try {
    const file = req.file;
console.log(req.file);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, data) => {
          if (error) reject(error);
          else resolve(data);
        })
        .end(file.buffer);
    });

    // Mock AI response
    const response = {
      disease: "Leaf Blight",
      symptoms: "Yellowing leaves, brown spots",
      treatment: "Use copper fungicide",
      imageUrl: result.secure_url,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/