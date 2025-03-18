import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Event ID:", id); // Debugging

  useEffect(() => {
    if (!id) {
      setError("Invalid event ID.");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:5002/api/events/${id}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching event details", error);
        setError("Failed to load event details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar />
    <div className="event-detail">
      <img src={event.image || "https://via.placeholder.com/500"} alt={event.name} />
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
      <button onClick={() => toast.success("Event booked successfully!")}>Book Now</button>
    </div>
    </>
  );
};

export default EventDetail;
