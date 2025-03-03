import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.image || "https://via.placeholder.com/300"} alt={event.name} />
      <h3>{event.name}</h3>
      <p><FaCalendarAlt /> {event.date} | <FaMapMarkerAlt /> {event.location}</p>
      <Link to={`/events/${event.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default EventCard;
