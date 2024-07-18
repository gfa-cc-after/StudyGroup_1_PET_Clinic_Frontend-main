import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forms.css';

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/login";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('') ;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiUrl, { email, password }, {
        headers: { 
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        setSuccess('Login successful!');
        setError('');
      } else {
        setError('Login failed. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default LoginForm;
