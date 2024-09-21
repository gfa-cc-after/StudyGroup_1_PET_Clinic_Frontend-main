import '../../styles/style.css'
import { useAuth } from '../../hooks/store'
import { ResponsiveDrawer } from './ResponsiveDrawer';
import { Outlet } from 'react-router-dom';

const AdminRoot = () => {
    const { user } = useAuth()
    const { displayName } = user;

    const { links } = [];

    return (
        // <div id='admin-home' className='prettybackground-box'>
            <ResponsiveDrawer>
                <Outlet />
            </ResponsiveDrawer>
        // </div>
    )
}
export { AdminRoot };