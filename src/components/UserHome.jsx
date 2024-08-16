import '../styles/style.css'
import { jwtDecode } from "jwt-decode"
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const UserHome = () => {
    const [userData, setUserData] = useState({
        email: '',
        pets: []
    })


    const dataUrl = import.meta.env.VITE_API_BACKEND_URL + "/user/home"
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const name = decodedToken.displayName
    const role = decodedToken.role



    useEffect(() => {
        // Fetch data from backend based on the token
        fetch(dataUrl, {
            method: 'GET',
            headers: {  'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.pets)
                setUserData({
                    email: data.email,
                    pets: data.pets
                })
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [])

return (
    <>
    <div className='prettybackground-box'>
        <div className='userhome-bg'></div>
        <div className='userhome'>
            <section className='welcome'><h1>Welcome <span>{name}</span>!</h1>
            <h2>Nice to see you again!</h2>
            <Link className="colored-button" to="/addPet" >Add Pet</Link>	</section>            
            <h3 className="home-h3">Your beloved pets</h3>
            <section className='userhome-content'>
                <table className="home-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Sex</th>
                            <th>Birth date</th>
                            <th>Last medical check up</th>
                            <th>Next medical check up</th>
                            <th>Special condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.pets.map((pet, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{pet.petName}</td>
                                        <td>{pet.petBreed}</td>
                                        <td>{pet.petSex}</td>
                                        <td>{pet.petBirthDate}</td>
                                        <td>{pet.lastCheckUp}</td>
                                        <td>{pet.nextCheckUp}</td>
                                        <td>{pet.specialCondition}</td>
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