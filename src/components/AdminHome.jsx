import '../styles/style.css'
import React from 'react'
import NavBar from './NavBar'

function AdminHome () {

    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const role = decodedToken.role
    const name = decodedToken.name

return (
    <div>
        <h1>Welcome {name}!</h1>
        <h2>{role}</h2>
    </div>
    )
}
export default AdminHome