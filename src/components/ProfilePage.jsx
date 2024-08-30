import '../styles/style.css';
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Check if token exists
    if (!token) {
        navigate('/login');
        return null; 
    }

    const decodedToken = jwtDecode(token);
    const originalName = decodedToken.displayName;
    const originalEmail = decodedToken.email;

    const apiUrl = `${import.meta.env.VITE_API_BACKEND_URL}/profile`;

    const [email, setEmail] = useState(originalEmail);
    const [username, setUsername] = useState(originalName);
    const [password, setPassword] = useState('');
    const [originalPassword, setOriginalPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [doubleCheckPassword, setDoubleCheckPassword] = useState('');
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
                setError('Error changing your profile: ' + (err.response.data.message || err.response.data));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDoubleCheckPasswordChange = (e) => {
        const value = e.target.value;
        setDoubleCheckPassword(value);
        setIsPasswordCorrect(value === password);
    };

    return (
        <>
        <div className='form-pb'></div>
        <div className="profilePage">
            <section className="welcome">
                <h1 id="settingsHead">Account Settings</h1>
            </section>
            <form onSubmit={handleProfileChange}>
                <div className="left-column">
                    <div className="form-group">
                        <div>
                            <p>Current email: <span>{originalEmail}</span></p>
                            <div>
                                <label htmlFor="email">Change Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div>
                            <p>Current username: <span>{originalName}</span></p>
                            <div>
                                <label htmlFor="username">Change Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            onChange={(e) => setOriginalPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">New Password Again:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={doubleCheckPassword}
                            onChange={handleDoubleCheckPasswordChange}
                            required
                        />
                    </div>
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
