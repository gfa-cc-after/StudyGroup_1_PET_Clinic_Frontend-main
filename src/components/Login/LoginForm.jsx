import { useEffect, useState } from 'react'
import axios from 'axios'
// import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/store';
import { Box, Button, Container, TextField } from '@mui/material';

const apiUrl = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/auth/login`;

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useAuth();

  const handleLogin = (event) => {
    event.preventDefault();

    axios.post(apiUrl, { email, password })
      .then((response) => {
        setUser(response.data.token)
        toast.success('Login successful ');
      })
      .catch((err) => {
        if (!err.response) {
          toast.error('There was a network error');
        } else {
          toast.error(`There was an error logging in...${err.response.data?.error}` || '');
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
    <Box>
      <h1>Login</h1>
      <Box
        display="flex"
        autoComplete='off'
        width="40vw"
        component="form"
        title="Login"
        flexDirection="column"
      >
        <TextField
          autoComplete="email"
          variant="outlined"
          label="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        >
        </TextField>
        <TextField
          type="password"
          autoComplete="password"
          variant="outlined"
          label="password"
          onChange={e => setPassword(e.target.value)}
          value={password}>
        </TextField>
        <Button
          type="submit"
          className="formButton"
          variant="outlined"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export { LoginForm };
