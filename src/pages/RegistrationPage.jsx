import '../styles/style.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../utils/httpClient';

const RegistrationPage = () => {
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
    register(formData.email, formData.password, formData.displayName)
      .then(() => {
        toast.success('Registration successful');
        navigate('/login');
      })
      .catch((error) => {
        toast.error('Registration failed');
      });

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

export { RegistrationPage };