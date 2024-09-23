import '../styles/style.css'
import logo from '../assets/pet-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/store';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ResponsiveDrawer } from './admin/ResponsiveDrawer';

const NavBar = () => {

    const { user, logout } = useAuth()
    const { role } = user;
    const { pathname } = useLocation();

    const drawerWidth = 240;

    return (
        <>
            <header className="navbar">
                <IconButton
                    color="inherit"
                    aria-label="open-drawer"
                    id='open-drawer-button'
                    edge="start"
                    sx={{ display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
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

            <ResponsiveDrawer width={drawerWidth} />
        </>
    )
}

export { NavBar };