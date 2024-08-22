import '../styles/style.css';
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Check if token exists
    if (!token) {
        navigate('/login'); // Redirect to login if no token
        return null; // Prevent rendering the rest of the component
    }

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const originalName = decodedToken.displayName;
    const originalEmail = decodedToken.email;
    const originalPassword = decodedToken.password;

    const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/profile";

    const [email, setEmail] = useState(originalEmail);
    const [username, setUsername] = useState(originalName);
    const [password, setPassword] = useState(originalPassword);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleProfileChange = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await axios.post(apiUrl, { username, email, password }, {
                headers: { "Content-Type": "application/json" }
            });

            console.log('Change was successful!');
            localStorage.setItem('token', response.data.token);

            const newDecodedToken = jwtDecode(localStorage.getItem('token'));
            localStorage.setItem('role', newDecodedToken.role);

            navigate(`/login`);
        } catch (err) {
            if (!err.response) {
                setError('There was a network error.');
            } else {
                setError('Error changing your profile: ' + err.response.data.message || err.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="form-pb"></div>
            <div className="profilePage">
              <section className="welcome">
                <h1 id='settingsHead'>
                  Account Settings
                </h1>
              </section>
              <form onSubmit={handleProfileChange}>
                <p>Current email: <span>{email}</span></p>
                <div>
                  <label htmlFor="email">Change Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value=''
                    onChange={(e) => setEmail(e.target.value)}
                  />
                <p>Current username: <span>{username}</span></p>
                </div>
                <div>
                  <label htmlFor="username">Change Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value=''
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">Current Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value=''
                    
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">New Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">New Password Again:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="changeButton" disabled={loading}>
                  {loading ? 'Changing...' : 'Change'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </form>
            </div>
        </>
      );
    };      

export default ProfilePage;