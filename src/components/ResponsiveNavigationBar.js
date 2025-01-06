import React, { useState } from 'react';
import './ResponsiveNavigationBar.css';

const ResponsiveNavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}> 
            <div className="logo">My App</div>
            <div className="menu-icon" onClick={toggleMenu}> 
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div> 
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}> 
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default ResponsiveNavigationBar;