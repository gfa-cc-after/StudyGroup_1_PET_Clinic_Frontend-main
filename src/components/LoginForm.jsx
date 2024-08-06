import { useState } from 'react'
import axios from 'axios'
import '../styles/style.css'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/login";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    
    axios.post(apiUrl, { email, password },  {headers: { "Content-Type": "application/json"}})
    .then((response) => {
      console.log('Login successful, token: ' + response.data)
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)

      const decodedToken = jwtDecode(token)
      const role = decodedToken.role

      navigate(`/${role}/home`)  // Redirect to the user's home page - be avare of the ` character! It is not ' or ".
    })
    .catch((error) => {console.log('There was an error in login.' , error)})
  }

  return (
    <>
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
    </>
  );
};

export default LoginForm;
