import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Social Media Links */}
                <div className="social-links">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        Twitter
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        Facebook
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        LinkedIn
                    </a>
                </div>

                {/* Copyright */}
                <p className="copyright">
                    &copy; 2024 DigiVault. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
