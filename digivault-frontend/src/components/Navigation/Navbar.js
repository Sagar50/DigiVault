import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout
import logo from '../../res/logo.svg';
import './Navbar.css';
import HamburgerMenu from "./Hamburger";
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
            localStorage.removeItem('username');
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
                    <a href="/"><img src={logo} className="logo" alt="logo"/></a>
                </div>
                <a className="appName" href="/" ><h2>DigiVault</h2></a>
            </div>
            <div className="navbarContainer  hidden lg:flex">
                <div className="navContainer">
                    <a className="hover:text-xl ease-in transition-all" href="/addWallet">Add Wallet</a>
                    <a className="hover:text-xl ease-in transition-all" href="/portfolio">Portfolio</a>
                    <a className="hover:text-xl ease-in transition-all" href="/trendingCrypto">Trending</a>
                    <a className="hover:text-xl ease-in transition-all" href="/news">News</a>
                    <a className="hover:text-xl ease-in transition-all" href="/viewChart">Charts</a>
                </div>
                <div className="navButtonContainer">
                    <button onClick={handleLogoutIn}>
                        {isLoggedIn ? (<span>Log Out</span>) : (<span>Log in</span>)}
                    </button>
                </div>
            </div>
            <div className="flex lg:hidden">
                <HamburgerMenu />
            </div>
        </header>
    );
};

export default Navbar;
