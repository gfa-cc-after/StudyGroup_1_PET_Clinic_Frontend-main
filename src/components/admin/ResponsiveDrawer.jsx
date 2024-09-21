import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/store';

const ResponsiveDrawer = (props, width) => {
    const { window } = props;
    const drawerWidth = width;
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
            <Divider />
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
            <Box
                component="nav"
                sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}
                aria-label="sidebar"
                id='admin-sidebar'
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
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
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
    );
}

export { ResponsiveDrawer };