import '../../styles/style.css'
import { Link } from 'react-router-dom'
import { useClinics } from "../../hooks/useClinics";

const ClinicManagement = () => {
    const { clinics } = useClinics();
    
    return (
        <div className='prettybackground-box'>
            <div className='userhome-bg'></div>
            <div className='userhome'>
                <section className='welcome'>
                    <h1 data-testid="welcomeId">Clinics in the Alliance</h1>
                    <Link className="colored-button" to="/user/pet/add" >Registrate New Clinic</Link>
                </section>
                <section className='userhome-content'>
                    <table className="home-table" data-testid="pet-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(clinics.length > 0) && clinics.map((clinic, index) => (
                                <tr key={index} data-testid="pet-row">
                                    <td>{index + 1}</td>
                                    <td>{clinic.name}</td>
                                    <td>{clinic.address}</td>
                                    <td>{clinic.phone}</td>
                                    <td>{clinic.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export { ClinicManagement };