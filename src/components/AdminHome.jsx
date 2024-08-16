import '../styles/style.css'
import React from 'react'
import NavBar from './NavBar'

function AdminHome () {

    const dataUrl = import.meta.env.VITE_API_BACKEND_URL + "/user/home"
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const name = decodedToken.displayName
    const role = decodedToken.role


return (
    <div>
        <h1>Welcome {name}!</h1>
        <h2>{role}</h2>
    </div>
    )
}
export default AdminHome;