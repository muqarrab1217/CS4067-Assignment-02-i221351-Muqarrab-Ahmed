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
        const { name, description, date, location, availableTickets } = req.body;
        const newEvent = new Event({ name, description, date, location, availableTickets });
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

