import React from 'react'
import '../styles/style.css'
import { jwtDecode } from "jwt-decode"


function UserHome () {
    
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const name = decodedToken.name
    const role = decodedToken.role

return (
    <>
        <div>
            <h1>Welcome {name}!</h1>
            <h2>{role}</h2>
        </div>
    </>
    )
}
export default UserHome;