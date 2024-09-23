import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/store';

const ResponsiveDrawer = (props, width) => {
    const { window } = props;
    const drawerWidth = width;
    const { pathname } = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [toggleButton, setToggleButton] = useState(document.getElementById('open-drawer-button'));

    const { user } = useAuth()
    const { displayName } = user;

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <>
            <div className="nametag">
                <h3>You are logged in as:</h3>
                <em>{displayName}</em>
            </div>
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
        </>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        setToggleButton(document.getElementById('open-drawer-button'));
        if (toggleButton) {
            toggleButton.addEventListener('click', handleDrawerToggle);
        }
    }, [document.getElementById('open-drawer-button')]);

    return (
        <>
            <Drawer
                component="nav"
                className='sidebar-temp'
                aria-label="sidebar"
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            {pathname.match(/^\/admin/) && (<Drawer
                component="nav"
                aria-label="sidebar"
                className='admin-sidebar-permanent'
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>)}
        </>
    );
}

export { ResponsiveDrawer };