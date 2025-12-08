import React, { useState } from 'react';
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
            <a href="/">
              <img className="ball" src={logo} alt="BucketsLive Logo" />
              <span> BucketsLive </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="links">
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/games">Games</a></li>
            <li><a href="/scores">Scores</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/players">Players</a></li>
            <li><a href="/about">About</a></li>
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
          <a href="/">
            <img className="ball" src={logo} alt="Logo" />
            <span> BucketsLive </span>
          </a>
        </div>

        <ul>
          <li><a href="/" onClick={toggleSidebar}>Home</a></li>
          <li><a href="/games" onClick={toggleSidebar}>Games</a></li>
          <li><a href="/scores" onClick={toggleSidebar}>Scores</a></li>
          <li><a href="/news" onClick={toggleSidebar}>News</a></li>
          <li><a href="/players" onClick={toggleSidebar}>Players</a></li>
          <li><a href="/about" onClick={toggleSidebar}>About</a></li>
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