import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { useAuth } from '../../hooks/store';

const drawerWidth = 240;

const ResponsiveDrawer = (props, children) => {
    const { window } = props;
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
        <div>
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
        </div>
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
            <Box sx={{ display: 'flex' }}>
                {/* <CssBaseline /> */}

                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
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
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >

                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export { ResponsiveDrawer };