import React, {useState} from 'react';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative !z-50">
            {/* Hamburger Button */}
            <button
                className={`top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-md ${isOpen ? 'fixed' : ''}`}
                onClick={toggleMenu}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Slide-out Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform transition-transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <ul className="mt-16 flex flex-col items-center gap-6">
                    <li>
                        <a href="/addWallet" className="text-lg">Add Wallet</a>
                    </li>
                    <li>
                        <a href="/portfolio" className="text-lg">Portfolio</a>
                    </li>
                    <li>
                        <a href="/trendingCrypto" className="text-lg">Trending</a>
                    </li>
                    <li>
                        <a href="/news" className="text-lg">News</a>
                    </li>
                    <li>
                        <a href="/viewChart" className="text-lg">Charts</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HamburgerMenu;
