import '../styles/style.css'
import logo from '../assets/pet-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/store';

const NavBar = () => {

    const { user, logout } = useAuth()
    const { role } = user;
    const { pathname } = useLocation();

    return (
        <header className="navbar">
            <div id="logo-section">
                <Link id="logo-link" to="/"><img id="logo-img" src={logo} alt="logo" /></Link>
                <Link id="logo-link" to="/"><h1>Pet Clinic Alliance</h1></Link>
            </div>
            <nav>
                <ul className='nav'>
                    {pathname === '/login' && (
                        <>
                            <li className='nav'><Link to="/help">Get help</Link></li>
                            <li className='nav'><Link to="/">Go back</Link></li>
                        </>
                    )}
                    {pathname === '/register' && (
                        <>
                            <li className='nav'><Link to="/help">Get help</Link></li>
                            <li className='nav'><Link to="/">Go back</Link></li>
                        </>
                    )}
                    {pathname === '/user/home' && (
                        <>
                            <li className='nav'><Link to={`/${role}/home`}>My pets</Link></li>
                            <li className='nav'><Link to={`/${role}/history`}>History</Link></li>
                            <li className='nav'><Link to={"/profile"}>Manage profile</Link></li>
                            <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                        </>
                    )}
                    {location.pathname === '/profile' && (
                        <>
                            <li className='nav'><Link to={`/${role}/home`}>My pets</Link></li>
                            <li className='nav'><Link to={`/${role}/history`}>History</Link></li>    
                            <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                        </>
                    )}
                    {pathname === '/admin/home' && (
                        <>
                            <li className='nav'><Link to={`/${role}/profile`}>Manage profile</Link></li>
                            <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                        </>
                    )}
                    {pathname === '/user/pet' && (
                        <>
                            <li className='nav'><Link to="/user/home">Go back</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;