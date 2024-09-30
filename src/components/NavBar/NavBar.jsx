import './NavBar.css'
import logo from '../../assets/pet-logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/store';
import { Container, Divider, IconButton, List, ListItem, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ResponsiveDrawer } from '../ResponsiveDrawer';
import { useEffect, useState } from 'react';


const drawerWidth = 240;

const pathsToLinksMap = {
  "/login": [
    { to: "/help", linkText: "Get help" },
    { to: "/", linkText: "Go back" },
  ],
  "/register": [
    { to: "/help", linkText: "Get help" },
    { to: "/", linkText: "Go back" },
  ],
  "/": [
    { to: "/register", linkText: "Register" },
    { to: "/login", linkText: "Login" },
  ],
}

/**
 * 
 * @param {String} pathName of the rurrent
 * @param {String} role of the user
 * @param {Function} logout to logut the current user
 * @returns {Array.<{ to: String, linkText: String, onClick: Function | undefined}>} linkObjects
 */
const getNavbarElements = (pathName, role, logout) => {
  if (pathsToLinksMap[pathName]) {
    return pathsToLinksMap[pathName]
  }
  if (pathName === "/profile") {
    return [
      { to: `/${role}/home`, linkText: "Back to Home" },
      { to: "/", linkText: "Log Out", onClick: logout }
    ]
  }
  if (pathName.startsWith("/user/")) {
    return [
      { to: "/user/messages", linkText: "Inbox" },
      { to: "/user/home", linkText: "My pets" },
      { to: "/user/history", linkText: "History" },
      { to: "/profile", linkText: "Manage profile" },
      { to: "/logout", linkText: "Logout", onClick: logout },
    ]
  }
  if (pathName.startsWith("/admin/")) {
    return [
      { to: "/admin/messages", linkText: "Inbox" },
      { to: "/user/home", linkText: "To User Home" },
      { to: "/profile", linkText: "Manage profile" },
      { to: "/logout", linkText: "Logout", onClick: logout },
    ]
  }
}

const NavBar = () => {

  const { user, logout } = useAuth()
  const { role } = user;
  const { pathname } = useLocation();

  const [navbarElements, setNavbarElements] = useState([]);

  useEffect(() => {
    setNavbarElements(getNavbarElements(pathname, role));
  }, [pathname, role]);

  const [links, setLinks] = useState({
    headerLinks: (
      <List className='nav'>
        <ListItem disablePadding><NavLink to="/help">Get help</NavLink></ListItem>
        <ListItem disablePadding><NavLink to="/">Go back</NavLink></ListItem>
      </List>
    ),
    sidebarLinks: (
      <List className='nav'>
        <ListItem>
          <NavLink to='/admin/clinics'>Manage Clinics</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/admin/users'>Manage Users</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/admin/pets'>Manage Pets</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/admin/stats'>Statistics</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/admin/support'>Development support</NavLink>
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
              <ListItem disablePadding><NavLink to="/help">Get help</NavLink></ListItem>
              <ListItem disablePadding><NavLink to="/">Go back</NavLink></ListItem>
            </List>
          )
        });
      }
      case '/register': () => {
        setLinks({
          ...links,
          headerLinks: (
            <List className='nav'>
              <ListItem disablePadding><NavLink to="/help">Get help</NavLink></ListItem>
              <ListItem disablePadding><NavLink to="/">Go back</NavLink></ListItem>
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
                <ListItem disablePadding><Link to={`/${role}/home`}>Back to Home</Link></ListItem>
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
                  <ListItem><Link to={`/${role}/home`}>Back to Home</Link></ListItem>
                  <ListItem><Link to={`/user/messages`}>Inbox</Link></ListItem>
                  <ListItem><Link to={`/user/home`}>My pets</Link></ListItem>
                  <ListItem><Link to={`/user/history`}>History</Link></ListItem>
                  <ListItem><Link to={"/profile"}>Manage profile</Link></ListItem>
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
                  <ListItem><Link to={`/admin/messages`}>Inbox</Link></ListItem>
                  <ListItem><Link to={`/profile`}>Manage profile</Link></ListItem>
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
                  <ListItem><Link to={`/user/messages`}>Inbox</Link></ListItem>
                  <ListItem><Link to={`/user/home`}>My pets</Link></ListItem>
                  <ListItem><Link to={`/user/history`}>History</Link></ListItem>
                  <ListItem><Link to={"/profile"}>Manage profile</Link></ListItem>
                  <ListItem><Link to={`/user/home`}>Go back</Link></ListItem>
                </List>
                <Divider />
                <Link className="colored-button" to="/" onClick={logout}>Log Out</Link>
              </>
            )
          });
        }
    }
  }, [pathname]);


  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row">
        <IconButton
          color="inherit"
          aria-label="open-drawer"
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Link id="logo-link" to={role ? `/${role}/home` : '/'}><img id="logo-img" src={logo} alt="logo" /></Link>
        <Link id="logo-link" to={role ? `/${role}/home` : '/'}><h1>Pet Clinic Alliance</h1></Link>
      </Stack>
      <Stack
        direction="row"
        width="30vw"
        justifyContent="space-around"
      >
        {
          navbarElements.map(navBarElement =>
            <Link
              key={`to-${navBarElement.to}`}
              to={navBarElement.to}
              onClick={navBarElement.onClick || undefined}
            >
              {navBarElement.linkText}
            </Link>)
        }
      </Stack>
      <ResponsiveDrawer width={drawerWidth} links={links} />
    </Stack >
  )
}

export { NavBar };