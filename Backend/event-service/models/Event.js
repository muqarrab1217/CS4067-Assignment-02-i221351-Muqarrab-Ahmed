const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    tickets: { type: Number, required: true },
    image: { type: String },
    category: {type: String}
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
