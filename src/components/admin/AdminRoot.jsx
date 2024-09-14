import '../../styles/style.css'
import { useAuth } from '../../hooks/store'
import { NavLink, Outlet } from 'react-router-dom';

function AdminRoot() {
    const { user } = useAuth()
    const { displayName } = user;

    return (
        <div id='admin-home' className='prettybackground-box'>
            <div className="sidebar">
                <div className="nametag">
                    <h3>You are logged in as:</h3>
                    <em>{displayName}</em>
                </div>

                <ul>
                    <li><NavLink to='/admin/clinics'>Manage Clinics</NavLink></li>
                    <li><NavLink to='/admin/users'>Manage Users</NavLink></li>
                    <li><NavLink to='/admin/pets'>Manage Pets</NavLink></li>
                    <li><NavLink to='/admin/stats'>Statistics</NavLink></li>
                    <li><NavLink to='/admin/support'>Development support</NavLink></li>
                </ul>
            </div>

            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}
export default AdminRoot;