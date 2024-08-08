import '../styles/style.css'
import logo from '../assets/pet-logo.png';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const role = localStorage.getItem('role')

    return (
        <header className="navbar">
            <div id="logo-section">
                <Link id="logo-link" to="/"><img id="logo-img" src={logo} alt="logo" /></Link>
                <h1>Pet Clinic Alliance</h1>
            </div>
            <nav>
                <ul>
                    {location.pathname === '/' && (
                        <>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <Link className="transparent-button" to="/login" >Log In</Link>
                            <Link className="colored-button" to="/register" >Sign Up</Link>
                        </>
                    )}
                    {location.pathname === '/login' && (
                        <>
                            <li><Link to="/help">Get help</Link></li>
                            <li><Link to="/">Go back</Link></li>
                        </>
                    )}
                    {location.pathname === '/register' && (
                        <>
                            <li><Link to="/help">Get help</Link></li>
                            <li><Link to="/">Go back</Link></li>
                        </>
                    )}
                    {location.pathname === '/user/home' && (
                        <>
                            <li><Link to={`/${role}/pets`}>My pets</Link></li>
                            <li><Link to={`/${role}/history`}>History</Link></li>
                            <li><Link to={`/${role}/profile`}>Manage profile</Link></li>    
                            <Link className="colored-button" to="/logout" >Log Out</Link>
                        </>
                    )}
                    {location.pathname === '/admin/home' && (
                        <>
                            <li><Link to={`/${role}/profile`}>Manage profile</Link></li>
                            <Link className="colored-button" to="/logout" >Log Out</Link>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;