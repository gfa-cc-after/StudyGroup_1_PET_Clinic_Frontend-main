import '../styles/style.css'
import logo from '../assets/pet-logo.png'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className="landingbody">
            <header className="navbar">
                <div id="logo-section">
                    <Link id="logo-link" to="/"><img id="logo-img" src={logo} alt="logo" /></Link>
                    <h1>Pet Clinic Alliance</h1>
                </div>
                <nav>
                    <li className='nav'><Link to="/about">About Us</Link></li>
                    <li className='nav'><Link to="/contact">Contact</Link></li>
                    <Link className="transparent-button" to="/login" >Log In</Link>
                    <Link className="colored-button" to="/register" >Sign Up</Link>
                </nav>
            </header>
            <section className="hero">
                <h2>Your  <span>pet</span>,<wbr /> our <span>passion</span></h2>
                <h3><span>Free</span> of charge / pain / drama. </h3>
                <p>Today's veterinarians are the only doctors educated to protect the health of both animals and people. They work hard to address the health and welfare needs of every species of animal. Veterinarians also play critical roles in environmental protection, research, food safety, and public health.</p>
            </section>
            <section className="services">
                <div className="service-container" id="owner">
                    <h4>For Pet Owners</h4>
                    <p>Follow your pet's medical history.</p>
                    <p>Find the best professionals in one place.</p>
                </div>
                <div className="service-container" id="exotic">
                    <h4>For Exotic Animals</h4>
                    <p>Specialists in exotic pets.</p>
                    <p>Unique care for unique animals.</p></div>
                <div className="service-container" id="wannabeowner">
                    <h4>For Wannabe Owners</h4>
                    <p>Find the best pet for you.</p>
                    <p>Learn how to take care of your pet.</p>
                </div>
                <div className="service-container" id="vet"><h4>For Veterinarians</h4>
                    <p>Easy cooperation with other clinics.</p>
                    <p>Maintainable, modern patient database.</p>
                </div>
                <div className="buttons-for-small-devices service-container">
                    <Link className="transparent-button" to="/login" >Log In</Link>
                    <Link className="colored-button" to="/register" >Sign Up</Link>
                </div>
            </section>
        </div>
    )
}
export default LandingPage
