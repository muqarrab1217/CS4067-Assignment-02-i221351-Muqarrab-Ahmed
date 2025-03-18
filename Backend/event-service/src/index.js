require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const eventRoutes = require("../routes/eventRoutes");
const Event = require("../models/Event"); // Import Event model

const app = express();
const PORT = process.env.PORT || 5002;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);

// Route to get event by ID
app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Event Service running on port ${PORT}`));
