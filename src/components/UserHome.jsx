import React from 'react'
import '../styles/style.css'
import { jwtDecode } from "jwt-decode"


function UserHome () {

    const decodedToken = jwtDecode(localStorage.getItem('token'))
    const role = decodedToken.role
    const name = decodedToken.name 

return (
    <>
        <div>
            <h1 id="userName" name="userName" data-testid="userName">Welcome {name}!</h1>
            <h2 id="role" name="role" data-testid="role">{role}</h2>
        </div>
    </>
    )
}
export default UserHome