import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Styling (we'll add this later)

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Event Booking</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/bookings">My Bookings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
