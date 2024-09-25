import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/store';
import { Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ResponsiveDrawer = (props) => {
    const { window } = props;
    const drawerWidth = props.width;
    const { pathname } = useLocation();

    const { headerLinks, sidebarLinks } = props.links;

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

            {pathname.match(/^\/admin/) && (sidebarLinks)}
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
            {/* TEMPORARY SIDEBAR - only when the screen is small */}
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
            >
                <IconButton
                    color="inherit"
                    aria-label="open-drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                {drawer}
                <Divider />
                {headerLinks}
            </Drawer>

            {/* PERMANENT ADMIN SIDEBAR - only when the path starts with /admin and the screen is big enough
            {pathname.match(/^\/admin/) && (<Drawer
                component="nav"
                aria-label="sidebar"
                className='admin-sidebar-permanent'
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>)} */}
        </>
    );
}

export { ResponsiveDrawer };