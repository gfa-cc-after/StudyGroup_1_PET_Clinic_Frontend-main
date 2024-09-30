import '../../styles/style.css'
import { Outlet } from 'react-router-dom';

const AdminRoot = () => {
    return (
        <main
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