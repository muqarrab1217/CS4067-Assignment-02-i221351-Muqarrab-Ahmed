import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import "./Signup.css";

function SignupPage() {
  // State hooks to manage form data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("booking user"); // Default role is 'booking user'
  const [error, setError] = useState(""); // To store error message
  const [success, setSuccess] = useState(""); // To store success message

  // Function to validate and handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success messages before validation
    setError("");
    setSuccess("");

    // Basic validation to check for blank fields
    if (!username || !email || !password1 || !password2) {
      setError("All fields are required.");
      return;
    }

    // Basic validation for passwords matching
    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare user data to send to backend
    const userData = {
      username: username,
      email: email,
      password: password1,
      role: role, // Send the selected role to the backend
    };

    try {
      // Make API call to backend to register user
      const response = await axios.post(
        "http://localhost:5008/api/users/register",
        userData
      );

      console.log(userData);

      // Check if the registration is successful
      if (response.status === 201) {
        setSuccess("User registered successfully!");
        setError(""); // Clear previous errors
      }
    } catch (err) {
      // Handle errors from backend (e.g., email already exists)
      if (err.response) {
        setError(
          err.response.data?.error || "An unexpected error occurred."
        );
      } else {
        setError("No response from server.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Signup Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password1">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password1"
          name="password1"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />

        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="password2"
          name="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        {/* Role Selection */}
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="booking user">Booking User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Signup</button>

        {/* Display error message if any */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p> && <a href="/login">I have an account</a>}

        <a href="/login">I have an account</a>
      </form>
    </div>
  );
}

export default SignupPage;
