import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { UserHomePage } from './pages/UserHomePage'
import { AdminHomePage } from './pages/AdminHomePage'
import { AddPetPage } from './pages/AddPetPage'
import { ProtectedPage } from './pages/utils/ProtectedPage'
import { NavBar } from './components/NavBar'
import { DecideNavBar } from './components/DecideNavBar'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <DecideNavBar>
        <NavBar />
      </DecideNavBar>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<RegistrationPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/user/home" element={<ProtectedPage><UserHomePage /></ProtectedPage>} />
        <Route exact path="/user/pet/add" element={<ProtectedPage><AddPetPage /></ProtectedPage>} />
        <Route exact path="/admin/home" element={<ProtectedPage><AdminHomePage /></ProtectedPage>} />
      </Routes>
      <ToastContainer />
    </Router>
  </React.StrictMode>,
)