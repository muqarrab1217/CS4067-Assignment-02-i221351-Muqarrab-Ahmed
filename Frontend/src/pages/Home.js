import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const location = useLocation();
  const [role, setRole] = useState("");

  useEffect(() => {
    // Get role from navigation state or fallback to localStorage
    const userRole = location.state?.role || localStorage.getItem("userRole");
    if (userRole) {
      setRole(userRole);
      localStorage.setItem("userRole", userRole); // Persist role
    }
  }, [location.state]);

  return (
    <>
    <Navbar />
    <div>
      <h1>Welcome to Event Booking</h1>
      <p>Find and book amazing events easily.</p>

      {role && <h2>Role: {role}</h2>}

      <Link to="/events">
        <button>Browse Events</button>
      </Link>
    </div>
    </>
  );
};

export default Home;
