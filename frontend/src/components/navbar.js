import React from 'react';
import '../component_styles/navbar.css';

function Nav() {
    return (
            <nav className='nav'>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Menu</a></li>
                    <li><a href="/reserve">Reservations</a></li>
                    <li><a href="#services">Order Online</a></li>
                    <li><a href="#contact">Login</a></li>
                </ul>
            </nav>
    );
}
export default Nav;