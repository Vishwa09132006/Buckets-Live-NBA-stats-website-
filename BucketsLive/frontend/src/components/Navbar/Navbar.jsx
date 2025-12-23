import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../ball.logo.png';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/games" className={location.pathname === '/games' ? 'active' : ''}>Games</Link></li>
            <li><Link to="/scores" className={location.pathname === '/scores' ? 'active' : ''}>Scores</Link></li>
            <li><Link to="/news" className={location.pathname === '/news' ? 'active' : ''}>News</Link></li>
            <li><Link to="/players" className={location.pathname === '/players' ? 'active' : ''}>Players</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
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

      {/* Mobile Sidebar - We'll fix this later */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-logo">
              <Link to="/" onClick={toggleSidebar}>
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
        </div>
      )}
    </>
  );
}

export default Navbar;