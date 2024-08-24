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
    const originalName = decodedToken.displayName;
    const originalEmail = decodedToken.email;
    const originalPassword = decodedToken.password; // Assuming password is stored in token

    const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/profile";

    const [email, setEmail] = useState(originalEmail);
    const [username, setUsername] = useState(originalName);
    const [password, setPassword] = useState('');
    const [currentPasswordInput, setCurrentPasswordInput] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleProfileChange = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

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

    const handleCurrentPasswordChange = (e) => {
        const value = e.target.value;
        setCurrentPasswordInput(value);
        setIsPasswordCorrect(value === originalPassword);
    };

    return (
        <>
            <div className="form-pb"></div>
            <div className="profilePage">
                <section className="welcome">
                    <h1 id='settingsHead'>Account Settings</h1>
                </section>
                <form onSubmit={handleProfileChange}>
                    <p>Current email: <span>{originalEmail}</span></p>
                    <div>
                        <label htmlFor="email">Change Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p>Current username: <span>{originalName}</span></p>
                    </div>
                    <div>
                        <label htmlFor="username">Change Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            required
                            onChange={handleCurrentPasswordChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="changeButton"
                        disabled={loading || !isPasswordCorrect}
                    >
                        {loading ? 'Changing...' : 'Change'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </>
    );
};

export default ProfilePage;
