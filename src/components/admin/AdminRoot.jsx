import '../../styles/style.css'
import { ResponsiveDrawer } from './ResponsiveDrawer';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const AdminRoot = () => {
    const drawerWidth = 240;

    return (
        <Box
            id='admin-home'
            className='prettybackground-box'
        >
            <ResponsiveDrawer width={ drawerWidth } />
            <Box
                component="main"
                id='admin-content'
                sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}
export { AdminRoot };