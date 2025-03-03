import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { toast } from "react-toastify";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error("Error fetching event details", error));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const handleBooking = () => {
    toast.success("Event booked successfully!");
  };

  return (
    <div className="event-detail">
      <img src={event.image || "https://via.placeholder.com/500"} alt={event.name} />
      <h2>{event.name}</h2>
      <p>{event.date} | {event.location}</p>
      <p>{event.description}</p>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default EventDetail;
