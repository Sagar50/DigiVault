import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout
import logo from '../../res/logo.svg';
import './Navbar.css';
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in (e.g., by checking a token in localStorage)
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); // If token exists, user is logged in
        }
    }, []);

    const handleLogoutIn = () => {
        // Remove the token from localStorage to log the user out
        if(isLoggedIn) {
            localStorage.removeItem('token');
            setIsLoggedIn(false); // Update the state
            navigate('/login'); // Redirect to login page after logout
        } else {
            navigate('/login');
        }

    };

    return (
        <header>
            <div className="logoWithText">
                <div className="logoContainer">
                    <a href="/home"><img src={logo} className="logo" alt="logo"/></a>
                </div>
                <a className="appName" href="/home" ><h2>DigiVault</h2></a>
            </div>
            <div className="navbarContainer">
                <div className="navContainer">
                    <a href="/addWallet">Add Wallet</a>
                    <a href="/portfolio">Portfolio</a>
                    <a href="#">News</a>
                    <a href="#">About Us</a>
                </div>
                <div className="navButtonContainer">
                    <button onClick={handleLogoutIn}>
                        {isLoggedIn ? (<span>Log Out</span>) : (<span>Log in</span>)}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
