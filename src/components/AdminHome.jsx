import '../styles/style.css'
import React from 'react'
import { useAuth } from '../hooks/store'

function AdminHome () {
    const { user } = useAuth()
    const { displayName, role } = user;

return (
    <div>
        <h1>Welcome {displayName}!</h1>
        <h2>{role}</h2>
    </div>
    )
}
export default AdminHome;