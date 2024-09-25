import '../styles/style.css'
import logo from '../assets/pet-logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/store';
import { Divider, IconButton, List, ListItem, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ResponsiveDrawer } from './admin/ResponsiveDrawer';
import { useEffect, useState } from 'react';

const NavBar = () => {

    const { user, logout } = useAuth()
    const { role } = user;
    const { pathname } = useLocation();

    const [links, setLinks] = useState({
        headerLinks: (
            <List className='nav'>
                <ListItem disablePadding className='nav'><NavLink to="/help">Get help</NavLink></ListItem>
                <ListItem disablePadding className='nav'><NavLink to="/">Go back</NavLink></ListItem>
            </List>
        ),
        sidebarLinks: (
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/admin/clinics'>Manage Clinics</NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/admin/users'>Manage Users</NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/admin/pets'>Manage Pets</NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/admin/stats'>Statistics</NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/admin/support'>Development support</NavLink>
                    </ListItemButton>
                </ListItem>
            </List>
        )
    });

    useEffect(() => {
        switch (pathname) {
            case '/login': () => {
                setLinks({
                    ...links,
                    headerLinks: (
                        <List className='nav'>
                            <ListItem disablePadding className='nav'><NavLink to="/help">Get help</NavLink></ListItem>
                            <ListItem disablePadding className='nav'><NavLink to="/">Go back</NavLink></ListItem>
                        </List>
                    )
                });
            }
            case '/register': () => {
                setLinks({
                    ...links,
                    headerLinks: (
                        <List className='nav'>
                            <ListItem disablePadding className='nav'><NavLink to="/help">Get help</NavLink></ListItem>
                            <ListItem disablePadding className='nav'><NavLink to="/">Go back</NavLink></ListItem>
                        </List>
                    )
                });
            }
            case '/profile': () => {
                setLinks({
                    ...links,
                    headerLinks: (
                        <>
                            <List className='nav'>
                                <ListItem disablePadding className='nav'><Link to={`/${role}/home`}>Back to Home</Link></ListItem>
                            </List>
                            <Divider />
                            <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                        </>
                    )
                });
            }
            default: () => {
            }
                if (pathname.match(/^\/user/)) {
                    setLinks({
                        ...links,
                        headerLinks: (
                            <>
                                <List className='nav'>
                                    <ListItem className='nav'><Link to={`/${role}/home`}>Back to Home</Link></ListItem>
                                    <ListItem className='nav'><Link to={`/user/messages`}>Inbox</Link></ListItem>
                                    <ListItem className='nav'><Link to={`/user/home`}>My pets</Link></ListItem>
                                    <ListItem className='nav'><Link to={`/user/history`}>History</Link></ListItem>
                                    <ListItem className='nav'><Link to={"/profile"}>Manage profile</Link></ListItem>
                                </List>
                                <Divider />
                                <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                            </>
                        )
                    });
                } else if (pathname.match(/^\/admin/)) {
                    setLinks({
                        ...links,
                        headerLinks: (
                            <>
                                <List className='nav'>
                                    <li className='nav'><Link to={`/admin/messages`}>Inbox</Link></li>
                                    <li className='nav'><Link to={`/profile`}>Manage profile</Link></li>
                                </List>
                                <Divider />
                                <Link className="transparent-button" to="/user/home">To User Home</Link>
                                <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                            </>
                        )
                    });
                };

                if (pathname === 'user/pet') {
                    setLinks({
                        ...links,
                        headerLinks: (
                            <>
                                <List className='nav'>
                                    <ListItem disablePadding className='nav'><Link to={`/${role}/home`}>Back to Home</Link></ListItem>
                                    <ListItem className='nav'><Link to={`/user/messages`}>Inbox</Link></ListItem>
                                    <ListItem className='nav'><Link to={`/user/home`}>My pets</Link></ListItem>
                                    <ListItem className='nav'><Link to={`/user/history`}>History</Link></ListItem>
                                    <ListItem className='nav'><Link to={"/profile"}>Manage profile</Link></ListItem>
                                    <ListItem className='nav'><Link to={`/user/home`}>Go back</Link></ListItem>
                                </List>
                                <Divider />
                                <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
                            </>
                        )
                    });
                }
        }
    }, [pathname]);

    const drawerWidth = 240;

    return (
        <>
            <header className="navbar">
                <IconButton
                    color="inherit"
                    aria-label="open-drawer"
                    id='open-drawer-button'
                    edge="start"
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

            <ResponsiveDrawer width={drawerWidth} links={links} />
        </>
    )
}

export { NavBar };