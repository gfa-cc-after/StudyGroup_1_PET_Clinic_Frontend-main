import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import UserHome from './components/UserHome'
import AdminRoot from './components/admin/AdminRoot'
import { ClinicManagement } from './components/admin/ClinicManagement'
import NavBar from './components/NavBar'
import DecideNavBar from './components/DecideNavBar'
import ProfilePage from './components/ProfilePage'
import AddPetForm from './components/AddPetForm'
import { Messages } from './components/Messages'

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
        <Route exact path="/user/home" element={<UserHome />} />
        <Route exact path='/user/messages' element={<Messages />}></Route>
        <Route exact path="/user/pet/add" element={<AddPetForm />} />
        <Route path="/admin/*" element={<AdminRoot />}>
          <Route path='messages' element={<Messages />}></Route>
          <Route path='home' element={<ClinicManagement />}></Route>
          <Route path='clinics' element={<ClinicManagement />}></Route>
          <Route exact path='users' element={<h1>User Management</h1>}></Route>
          <Route exact path='pets' element={<h1>Pet Management</h1>}></Route>
          <Route exact path='stats' element={<h1>Statistics</h1>}></Route>
          <Route exact path='support' element={<h1>Developments support</h1>}></Route>
        </Route>
        <Route exact path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
)