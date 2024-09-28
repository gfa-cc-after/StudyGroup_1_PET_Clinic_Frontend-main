import '../../styles/style.css'
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const AdminRoot = () => {

    return (
        <main
            component="main"
            id='admin-home'
            className='prettybackground-box'
            data-testid='admin-home'
        >
            <div
                className='admin-content'
                data-testid='admin-content'
            >
                <Outlet />
            </div>
        </main>
    )
}
export { AdminRoot };