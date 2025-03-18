import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import Booking from "./pages/Booking";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider, useRole } from "./context/RoleContext";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useRole();
  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <RoleProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/home" element={<Home />} />

            {/* User Dashboard (Accessible by users only) */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard (Only accessible by admin) */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EventList />
                </ProtectedRoute>
              }
            />

            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/bookings" element={<Booking />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </RoleProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
