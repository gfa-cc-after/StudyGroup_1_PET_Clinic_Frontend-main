import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
//import reportWebVitals from './reportWebVitals'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegistrationForm />} />
        <Route exact path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)

//reportWebVitals()
