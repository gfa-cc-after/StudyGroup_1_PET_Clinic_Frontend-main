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
                <Link id="logo-link" to={role ? `/${role}/home` : '/'}><img id="logo-img" src={logo} alt="logo" /></Link>
                <Link id="logo-link" to={role ? `/${role}/home` : '/'}><h1>Pet Clinic Alliance</h1></Link>
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
                    {location.pathname === '/profile' && (
                        <>
                            <li className='nav'><Link to={`/${role}/home`}>Back to Home</Link></li>
                            <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                        </>
                    )}
                    {pathname.match(/^\/user/) && (
                        <>
                            <li className='nav'><Link to={`/user/messages`}>Inbox</Link></li>
                            <li className='nav'><Link to={`/user/home`}>My pets</Link></li>
                            <li className='nav'><Link to={`/user/history`}>History</Link></li>
                            <li className='nav'><Link to={"/profile"}>Manage profile</Link></li>
                            <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                        </>
                    )}
                    {pathname.match(/^\/admin/) && (
                        <>
                            <li className='nav'><Link to={`/admin/messages`}>Inbox</Link></li>
                            <li className='nav'><Link to={`/profile`}>Manage profile</Link></li>
                            <Link className="transparent-button" to="/user/home">To User Home</Link>
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