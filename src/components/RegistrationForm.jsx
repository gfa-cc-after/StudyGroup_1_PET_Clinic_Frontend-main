import '../styles/App.css'
import React, { useState } from 'react'
import axios from 'axios'

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = axios.post(import.meta.env.REACT_BACKENTD_URL, formData);
            //console.log('Registration successful', response.data);            security risk
        } catch (error) {
            console.log('There was an error registarting!', error);
        }
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <br></br>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <br></br>
            </div>

            <div>
                <label htmlFor="username">Username:</label>
                <br></br>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                <br></br>
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <br></br>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                <br></br>
            </div>
            <button type="submit">Register</button>
        </form>
    );

};

export default RegistrationForm;