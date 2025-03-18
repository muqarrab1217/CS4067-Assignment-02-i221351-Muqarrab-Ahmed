import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import "./Login.css";

function LoginPage() {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setRole } = useRole();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Fetch user info from API
      const response = await axios.get(`http://localhost:5008/api/users/email?email=${email}`);
      const user = response.data;

      if (!user) {
        setError('User not found');
        return;
      }

      // Step 2: Match password
      if (user.password !== password) {
        setError('Invalid password');
        return;
      }

      // Step 3: Set user role and login
      setRole(user.role);
      login();
      console.log("Login successful, Role:", user.role);

      // Step 4: Redirect to homepage or dashboard
      navigate('/home', { state: { role: user.role } });

    } catch (err) {
      console.error("Login error:", err);
      setError('Error logging in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-button">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <a href="/signup">Create an account</a>
      </form>
    </div>
  );
}

export default LoginPage;
