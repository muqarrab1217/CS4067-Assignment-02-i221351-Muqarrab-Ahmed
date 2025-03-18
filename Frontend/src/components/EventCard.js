import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p><FaCalendarAlt /> {event.date}</p>
      <p>{event.location}</p>
      
      {/* Fix: Use _id instead of id */}
      <Link to={`/events/${event._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default EventCard;
