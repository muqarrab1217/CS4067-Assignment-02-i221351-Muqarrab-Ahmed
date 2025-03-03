import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Event Booking</h1>
      <p>Find and book amazing events easily.</p>
      <Link to="/events">
        <button>Browse Events</button>
      </Link>
    </div>
  );
};

export default Home;
