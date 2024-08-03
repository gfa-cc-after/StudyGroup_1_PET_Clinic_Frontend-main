import { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';
import NavBar from './NavBar';

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/login";

const LoginForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    axios.post(apiUrl, { email, password },  {headers: { "Content-Type": "application/json"}})
    .then((response) => {console.log('Login successful, token: ' + response.data)})
    .catch((error) => {console.log('There was an error in login.' , error)})
  }

  return (
    <>
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
      </form>
    </div>
    </>
  );
};

export default LoginForm;
