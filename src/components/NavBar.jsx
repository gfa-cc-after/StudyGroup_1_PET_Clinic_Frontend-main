import '../styles/style.css'
import logo from '../assets/pet-logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className="navbar">
            <div id="logo-section">
                <Link id="logo-link" to="/"><img id="logo-img" src={logo} alt="logo" /></Link>
                <h1>Pet Clinic Alliance</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">About Us</a></li>
                    <li><a href="vets.html">Contact</a></li>
                </ul>
                <Link className="transparent-button" to="/login" >Log in</Link>
                <Link className="colored-button" to="/register" >Sign Up</Link>
            </nav>
        </header>
    )
}

export default NavBar;