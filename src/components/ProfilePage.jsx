import '../styles/style.css';
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const decodedToken = jwtDecode(token);
    const originalName = decodedToken.displayName;
    const originalEmail = decodedToken.email;
    

    const apiUrl = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/user/profile`;

    const [email, setEmail] = useState(originalEmail);
    const [displayName, setDisplayName] = useState(originalName);
    const [password, setPassword] = useState('');
    const [originalPassword, setOriginalPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [doubleCheckPassword, setDoubleCheckPassword] = useState('');

    const handleProfileChange = (event) => {
        event.preventDefault();

        axios.post(apiUrl, { displayName, email, password, originalPassword }, {
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                }
        })
        .then((response) => {
            toast.success('Change was successful! Please login after.');

            setTimeout(() => navigate('/login'), 3000);
        })
        .catch((err) => {
            if (!err.response) {
                toast.error('There was a network error.');
            } else {
                toast.error('Error changing your profile: ' + (err.response.data.message || err.response.data));
            }
        })
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
                <h1 style={{ textAlign: 'center' }}>Profile Settings</h1>
            </section>
            <form onSubmit={handleProfileChange}>
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
                                    required
                                />
                            </div>
                        <div>
                            <p>Current username: <span>{originalName}</span></p>
                            <div>
                                <label htmlFor="displayName">Change Username:</label>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                </div>
                        <label htmlFor="currentPassword">Original Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            onChange={(e) => setOriginalPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        <label htmlFor="confirmPassword">New Password Again:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={doubleCheckPassword}
                            onChange={handleDoubleCheckPasswordChange}
                            
                        />
                <button
                    type="submit"
                    className="changeButton"
                    disabled={!isPasswordCorrect}
                    
                >
                Change</button>
            </form>
            <ToastContainer />
        </div>
        </>
    );
};    

export default ProfilePage;
