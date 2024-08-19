import React from 'react';
import logo from './frontend/assets/Logo .svg';
import '../component-styles/header.css';
import Nav from '../components/navbar';

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <img src={logo}  alt='Little Lemon Logo' className='logo-img'/>
            </div>
            <Nav />
        </header>

    );
}
export default Header;