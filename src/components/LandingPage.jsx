import '../styles/LandingPage.css'
import React, { useState } from 'react'
import logo from '../assets/pet-logo.png';


function LandingPage() {
    return (
        <body>
            
            <header className="navbar">
                <div id="logo">
                <img src={logo} alt="logo" />
                <h1>Pet Clinic Alliance</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">About Us</a></li>
                        <li><a href="vets.html">Contact</a></li>
                    </ul>
                    <button className="transparent-button">Log in</button>
                    <button className="colored-button">Sign Up</button>
                </nav>
            </header>
            
            <section className="hero">
                <h2>Your  <span>pet</span>,<wbr/> our <span>passion</span></h2>
                <h3><span>Free</span> of charge / pain / drama. </h3>
                <p>Today's veterinarians are the only doctors educated to protect the health of both animals and people. They work hard to address the health and welfare needs of every species of animal. Veterinarians also play critical roles in environmental protection, research, food safety, and public health.</p>
            </section>
            <section className="services">
                <div className="sercive-container" id="owner">
                                                            <h4>For Pet Owners</h4>
                                                            <p>Follow your pet's medical history.</p>
                                                            <p>Find the best professionals in one place.</p></div>
                <div className="sercive-container" id="exotic">
                                                            <h4>For Exotic Animals</h4>
                                                            <p>Specialists in exotic pets.</p>
                                                            <p>Unique care for unique animals.</p></div>
                <div className="sercive-container"> </div>
                <div className="sercive-container" id="vet"><h4>For Veterinarians</h4>
                                                            <p>Easy cooperation with other clinics.</p>
                                                            <p>Maintainable, modern patient database.</p></div>
            </section>
        </body>
    )
}
export default LandingPage
