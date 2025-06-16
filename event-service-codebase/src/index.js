require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const serverless = require("serverless-http"); // ✅ Add this

const eventRoutes = require("../routes/eventRoutes");
const Event = require("../models/Event");

const app = express();

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://eventuser:eventpass123@eventbooking-mongodb-1:27017/eventbooking?authSource=admin";

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Ensure image upload directory exists
const uploadDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const filePath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(filePath)) {
      const error = new Error("File already exists. Please rename and try again.");
      error.code = "FILE_EXISTS";
      return cb(error, null);
    }
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ filePath: `/images/${req.file.filename}` });
});

// Error handling
app.use((err, req, res, next) => {
  if (err.code === "FILE_EXISTS") {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: "File upload failed", error: err.message });
});

// Static files
app.use("/images", express.static(uploadDir));

// Routes
app.use("/api/events", eventRoutes);

// Get single event
app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Root health check
app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

// ✅ Export handler for Vercel
module.exports = serverless(app);
