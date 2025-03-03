import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import Booking from "./pages/Booking";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<ToastContainer position="top-right" autoClose={3000} />

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/bookings" element={<Booking />} />
      </Routes>
    </Router>
  );
};

export default App;
