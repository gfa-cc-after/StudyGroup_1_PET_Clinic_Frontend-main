import '../styles/style.css';
import '../styles/profileDeletion.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileDeletion from './ProfileDeletion';

const ProfilePage = () => {
    const { token, user, logout } = useAuth()
    const { displayName:originalName, email:originalEmail } = user;
    const navigate = useNavigate();

    const apiUrl = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/user/profile`;

    const [email, setEmail] = useState(originalEmail);
    const [displayName, setDisplayName] = useState(originalName);
    const [originalPassword, setOriginalPassword] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [doubleCheckPassword, setDoubleCheckPassword] = useState(undefined);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        // Ensure passwords are validated before proceeding
        validatePasswordsBeforeSubmit();

        setDisabled((doubleCheckPassword || password) && !isPasswordCorrect)
    }, [password, isPasswordCorrect, doubleCheckPassword])
    
    // Function to validate passwords on form submission, not on change   
    const validatePasswordsBeforeSubmit = () => {
        if (password === doubleCheckPassword) {
            setIsPasswordCorrect(true);
        } else {
            setIsPasswordCorrect(false);
        }
    };

    const handleProfileChange = (event) => {
        event.preventDefault();

        if (isPasswordCorrect) {
            axios.patch(apiUrl, { displayName, email, password, originalPassword }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                toast.success('Change was successful. Please login after!');
                logout();
                setTimeout(() => navigate('/login'), 1500);
            })
            .catch((err) => {
                if (!err.response) {
                    toast.error('There was a network error.');
                } else {
                    toast.error('Error changing your profile: ' + err.response.data?.error || '');
                }
            });
        }
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
                    onChange={(e) => setDoubleCheckPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="changeButton"
                    disabled={disabled}
                >Change</button>
            </form>
            <ProfileDeletion />
            <ToastContainer  
                autoClose={1000}
            />
        </div>
        </>
    );
};

export default ProfilePage;
