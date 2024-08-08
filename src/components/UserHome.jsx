import React from 'react'
import '../styles/style.css'
import { jwtDecode } from "jwt-decode"


function UserHome () {

    const token = localStorage.getItem('token')
    const role = token.role
    const name = token.name



return (
    <>
        <div>
            <h1>Welcome {name}!</h1>
            <h2>{role}</h2>
        </div>
    </>
    )
}
export default UserHome