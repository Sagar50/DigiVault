import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/sagarp02/" target="_blank" rel="noopener noreferrer"
                       className="social-link">
                        LinkedIn
                    </a>
                    <a href="https://github.com/Sagar50" target="_blank" rel="noopener noreferrer" className="social-link">
                        Github
                    </a>
                    <a href="https://portfolio-sagar50.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-link">
                        Portfolio
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
