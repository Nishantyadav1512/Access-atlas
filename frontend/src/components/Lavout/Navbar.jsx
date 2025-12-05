import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ♿ AccessAtlas
        </Link> 
 
        <div className="navbar-links">
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/help" className="navbar-link">
            Help
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <Link to="/analyze" className="navbar-link">
                Analyze
              </Link>
              <Link to="/reports" className="navbar-link">
                Reports
              </Link>
              <Link to="/profile" className="navbar-link">
                👤 {user?.name}
              </Link>
              <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;