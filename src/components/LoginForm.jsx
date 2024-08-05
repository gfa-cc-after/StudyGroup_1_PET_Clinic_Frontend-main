import { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/login";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiUrl, { email, password },  {headers: { "Content-Type": "application/json"}});
      
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if(role === 'USER') {
        navigate('/user/home');
      } else if(role === 'ADMIN') {
        navigate('/admin/home');
      }

      navigate('/');
    } catch (err) {
      if (!err.response) {
        setError('There was a network error');
      } else {
        setError('There was an error logging in...'+ err.response.data);
      }
    }
  }

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
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
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="formButton">Login</button>
        <p style={{color: 'red'}}>{error ? error : ""}</p>
      </form>
    </div>
  );
};

export default LoginForm;
