import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import UserHome from './components/UserHome'
import AdminHome from './components/AdminHome'
import NavBar from './components/NavBar'
import DecideNavBar from './components/DecideNavBar'
import AddPetForm from './components/AddPetForm'
import { ToastContainer } from 'react-toastify';
import { ProtectedPage } from './components/ProtectedPage'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <DecideNavBar>  {/* this component decides based on the location whether the navBar (child) should be loaded or not */}
        <NavBar />
      </DecideNavBar>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegistrationForm />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/user/home" element={<ProtectedPage><UserHome /></ProtectedPage>} />
        <Route exact path="/user/pet/add" element={<ProtectedPage><AddPetForm /></ProtectedPage>} />
        <Route exact path="/admin/home" element={<ProtectedPage><AdminHome /></ProtectedPage>} />
      </Routes>
      <ToastContainer />
    </Router>
  </React.StrictMode>,
)