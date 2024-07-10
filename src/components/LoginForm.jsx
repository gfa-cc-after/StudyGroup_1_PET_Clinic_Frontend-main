// import '../styles/LoginForm.css';
import React from 'react'

const LoginForm = () => {
  return (
    <div className="LoginForm">
      <h1>Login</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;