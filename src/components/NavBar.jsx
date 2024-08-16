import '../styles/style.css'
import logo from '../assets/pet-logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {


    const role = localStorage.getItem('role')

    return (
        <header className="navbar">
            <div id="logo-section">
                <Link id="logo-link" to="/"><img id="logo-img" src={logo} alt="logo" /></Link>
                <Link id="logo-link" to="/"><h1>Pet Clinic Alliance</h1></Link>
            </div>
            <nav>
                <ul className='nav'>
                    {location.pathname === '/login' && (
                        <>
                            <li className='nav'><Link to="/help">Get help</Link></li>
                            <li className='nav'><Link to="/">Go back</Link></li>
                        </>
                    )}
                    {location.pathname === '/register' && (
                        <>
                            <li className='nav'><Link to="/help">Get help</Link></li>
                            <li className='nav'><Link to="/">Go back</Link></li>
                        </>
                    )}
                    {location.pathname === '/user/home' && (
                        <>
                            <li className='nav'><Link to={`/${role}/pets`}>My pets</Link></li>
                            <li className='nav'><Link to={`/${role}/history`}>History</Link></li>
                            <li className='nav'><Link to={`/${role}/profile`}>Manage profile</Link></li>    
                            <Link className="colored-button" to="/logout" >Log Out</Link>
                        </>
                    )}
                    {location.pathname === '/admin/home' && (
                        <>
                            <li className='nav'><Link to={`/${role}/profile`}>Manage profile</Link></li>
                            <Link className="colored-button" to="/logout" >Log Out</Link>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;