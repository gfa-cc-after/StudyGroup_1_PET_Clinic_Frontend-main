import '../styles/style.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/api/v1/auth/register"

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        displayName: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(apiUrl, formData, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
            toast.success('Registration successful...it\'s time to login :)');
            setTimeout(() => navigate('/login'), 3000); // Delay navigation for 3 second
        })
        .catch((err) =>{
            if (!err.response) {
                toast.error('There was a network error');
            } else {
                toast.error('There was an error while registering...'+ err.response.data);
            }
          })
    }
    
    return (
        <div className='prettybackground-box'>
            <div className='form-bg'></div>
            <div className="registrationForm">
                <h1>Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div>
                        <label htmlFor="displayName">Username:</label>
                        <input type="text" id="displayName" name="displayName" value={formData.displayNamee} onChange={handleChange} required />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" minLength="3" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="formButton">Register</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );

};

export default RegistrationForm;