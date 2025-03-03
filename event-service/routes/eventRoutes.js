const express = require("express");
const { getEvents, createEvent, getEventById } = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);

module.exports = router;
