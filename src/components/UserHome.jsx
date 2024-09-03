import '../styles/style.css'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import usePets from '../hooks/usePets'
import { useAuth } from '../hooks/store'

const UserHome = () => {

    const { displayName } = useAuth()

    const { pets } = usePets();
    console.log(pets)

    return (
        <div className='prettybackground-box'>
            <div className='userhome-bg'></div>
            <div className='userhome'>
                <section className='welcome'><h1>Welcome <span>{displayName}</span>!</h1>
                    <h2>Nice to see you again!</h2>
                    <Link className="colored-button" to="/user/pet/add" >Add Pet</Link>	</section>
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
                            {pets.length > 0 && pets.map((pet, index) => (
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
    )
}
export default UserHome