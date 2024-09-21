import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/store';

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/api/v1/auth/login";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogin = (event) => {
    event.preventDefault();

    axios.post(apiUrl, { email, password }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        setUser(response.data.token)
        toast.success('Login successful ');
      })
      .catch((err) => {
        if (!err.response) {
          toast.error('There was a network error');
        } else {
          toast.error('There was an error logging in...' + err.response.data?.error || '');
        }
      })
  }

  useEffect(() => {
    if (user?.role) {
      if (user.role === 'admin') {
        navigate('/admin/home');
      } else {
        navigate('/user/home');
      }
    }
  }, [user, navigate]);

  return (
    <div className='prettybackground-box'>
      <div className='form-bg'></div>
      <div className="loginForm">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='email'>Email:</label>
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
            <label htmlFor='password'>Password:</label>
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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
