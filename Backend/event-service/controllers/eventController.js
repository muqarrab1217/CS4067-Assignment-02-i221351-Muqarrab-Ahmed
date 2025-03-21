const Event = require("../models/Event");

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get top 6 events
exports.getTopEvents = async (req, res) => {
    try {
        const topEvents = await Event.find().sort({ createdAt: -1 }).limit(6); // Fetch latest 6 events
        res.status(200).json(topEvents);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create an event
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, price, tickets, image, category } = req.body;

        // Validate required fields
        if (!title || !date || !location || !price || !tickets || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newEvent = new Event({ title, description, date, location, price, tickets, image, category });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while creating event" });
    }
};

