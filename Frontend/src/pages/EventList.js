import React, { useState, useEffect } from "react";
import axios from "../services/api";
import EventCard from "../components/EventCard";
import { FaSearch } from "react-icons/fa";
import "./EventList.css"; 

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events", error));
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
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
          filteredEvents.map(event => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
