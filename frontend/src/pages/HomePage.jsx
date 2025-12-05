import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Make the Web Accessible for Everyone
          </h1>
          <p className="hero-subtitle">
            Analyze your website&apos;s accessibility with powerful tools like
            Lighthouse and Axe-core. Get detailed reports and actionable
            insights.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hero-btn hero-btn-primary">
                  Go to Dashboard
                </Link>
                <Link to="/analyze" className="hero-btn hero-btn-secondary">
                  Analyze Website
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="hero-btn hero-btn-primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="hero-btn hero-btn-secondary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;