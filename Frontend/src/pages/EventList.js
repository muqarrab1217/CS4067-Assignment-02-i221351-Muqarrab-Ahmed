import React, { useState, useEffect } from "react";
import axios from "axios"; // Use axios directly
import EventCard from "../components/EventCard";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./EventList.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5002/api/events") // Updated API URL
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events", error));
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Navbar />
    <div className="event-list-container">
      <h2>Find an Event</h2>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
    </>
  );
};

export default EventList;
