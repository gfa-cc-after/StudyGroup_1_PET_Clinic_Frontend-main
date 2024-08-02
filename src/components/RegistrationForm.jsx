import '../styles/style.css'
import { useState } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/register";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: null,
        password: null,
        username: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await axios.post(apiUrl, formData, { headers: { "Content-Type": "application/json" } })
        .then((response) => {console.log('Registration successful')})
        .catch((error) => {console.log('There was an error registarting!', error)})
    }

    
    return (
        <div className="registrationForm">
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="formButton">Register</button>
            </form>
        </div>
    );

};

export default RegistrationForm;