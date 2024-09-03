import '../styles/style.css'
import React from 'react'
import { jwtDecode } from 'jwt-decode'

function AdminHomePage() {

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
export { AdminHomePage };