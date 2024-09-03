import '../styles/style.css'
import 'react-toastify/dist/ReactToastify.css';
import { useLoginForm } from '../hooks/loginForm.hook';


const LoginForm = () => {
  const { callLogin, email, setEmail, password, setPassword } = useLoginForm();

  const handleLogin = async (event) => {
    event.preventDefault();
    await callLogin();
  }

  return (
    <>
      <div className='prettybackground-box'>
        <div className='form-bg'></div>
        <div className="loginForm">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor='email'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              autoComplete="home email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor='password'>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="formButton">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
