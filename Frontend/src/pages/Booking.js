import React, { useState } from "react";
import axios from "../services/api";
import Navbar from "../components/Navbar";

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    eventId: "",
  });

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/bookings", bookingDetails)
      .then(response => alert("Booking successful!"))
      .catch(error => console.error("Error booking event", error));
  };

  return (
    <>
    <Navbar />
    <div>
      <h2>Book Your Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <input type="text" name="eventId" placeholder="Event ID" onChange={handleChange} required />
        <button type="submit">Book Now</button>
      </form>
    </div>
    </>
  );
};

export default Booking;
