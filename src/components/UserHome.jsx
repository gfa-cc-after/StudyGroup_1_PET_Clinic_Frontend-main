import '../styles/style.css'
import { jwtDecode } from "jwt-decode"
import React, { useState, useEffect } from 'react'

const dataUrl = import.meta.env.VITE_API_BACKEND_URL + "/data"
const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)
const name = decodedToken.name
const role = decodedToken.role


const UserHome = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        // Fetch data from backend based on the token
        fetch(dataUrl, {
            method: 'GET',
            headers: {  'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])


return (
    <>
    <div className='prettybackground-box'>
        <div className='userhome-bg'></div>
        <div className='userhome'>
            <section className='welcome'><h1>Welcome <span>Original User {name}</span>!</h1>
            <h2>Nice to see you again!</h2></section>            
            
            <section className='userhome-content'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Last medical check up</th>
                            <th>Next medical check up</th>
                            <th>Special condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.species}</td>
                            <td>{user.lastMedicalCheckUp}</td>
                            <td>{user.nextMedicalCheckUp}</td>
                            <td>{user.specialCondition}</td>
                            </tr>
                         ))}
                    </tbody>
                </table>
            </section>
        </div>
    </div>
    </>
    )
}
export default UserHome