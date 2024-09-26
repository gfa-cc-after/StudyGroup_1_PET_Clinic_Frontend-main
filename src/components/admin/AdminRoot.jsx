import '../../styles/style.css'
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const AdminRoot = () => {

    return (
        <Box
            component="main"
            id='admin-home'
            className='prettybackground-box'
        >
                <div className='admin-content'>
                    <Outlet />
                </div>
            </Box>
    )
}
export { AdminRoot };