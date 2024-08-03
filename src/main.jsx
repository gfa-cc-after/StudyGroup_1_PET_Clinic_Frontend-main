import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Router>
            <Routes>
                <Route exact path="/" element={ <LandingPage />} />
                <Route exact path="/register" element={ <RegistrationForm />} />
                <Route exact path="/login" element={ <LoginForm />} />
                <Route exact path="/user/home" element={ <UserHome />} />
                <Route exact path="/admin/home" element={ <AdminHome />} />
            </Routes>
        </Router>
  </React.StrictMode>,
)


