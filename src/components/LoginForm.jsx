import '../styles/LoginForm.css'
import React, { useState } from 'react'
import axios from 'axios'

const LOGIN = import.meta.env.VITE_API_BACKEND_URL_LOGIN

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        
        await axios.post(LOGIN, formData, {
              headers: { 
                "Content-Type": "application/json"
              } 
        })
        .then((response) => {console.log('Login successful')})
        .catch((error) => {console.log('There was an error logging in!', error)})
    }

    return (
        <div className="LoginForm">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );

};

export default LoginForm;
