import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../ball.logo.png';

function Navbar() {
    // State management
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Toggle sidebar for mobile menu
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle authentication button click
    const handleAuthClick = () => {
        console.log('Sign in clicked!');
        // TODO: Add modal functionality later
    };

    return (
        <>
            <header>
                <div className="navbar">
                    {/* Logo Section */}
                    <div className="logo">
                        <Link to="/">
                            <img className="ball" src={logo} alt="BucketsLive Logo" />
                            <span> BucketsLive </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="links">
                        {/* Desktop Navigation Links */}
                        <ul className="links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/games">Games</Link></li>
                            <li><Link to="/scores">Scores</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/players">Players</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </ul>

                    {/* Sign In Button */}
                    <button className="signup" onClick={handleAuthClick}>
                        <span className="material-symbols-outlined">account_circle</span>
                        Sign in
                    </button>

                    {/* Mobile Toggle Button */}
                    <div className="toggle-btn" onClick={toggleSidebar}>
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <Link to="/">
                        <img className="ball" src={logo} alt="Logo" />
                        <span> BucketsLive </span>
                    </Link>
                </div>

                <ul>
                    <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
                    <li><Link to="/games" onClick={toggleSidebar}>Games</Link></li>
                    <li><Link to="/scores" onClick={toggleSidebar}>Scores</Link></li>
                    <li><Link to="/news" onClick={toggleSidebar}>News</Link></li>
                    <li><Link to="/players" onClick={toggleSidebar}>Players</Link></li>
                    <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
                </ul>

                <button className="signup" onClick={handleAuthClick}>
                    <span className="material-symbols-outlined">account_circle</span>
                    Sign in
                </button>
            </div>

            {/* Overlay to close sidebar when clicking outside */}
            {isSidebarOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999
                    }}
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}

export default Navbar;