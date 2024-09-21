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
            <ResponsiveDrawer width={drawerWidth} />
            <Box
                component="main"
                id='admin-main'
                sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                    <div className='admin-content'>
                        <Outlet />
                    </div>
            </Box>
        </Box>
    )
}
export { AdminRoot };