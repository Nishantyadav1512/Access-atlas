import React from 'react';
import '../styles/Home.css';

const HelpPage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Help &amp; How to Use</h1>
          <p className="hero-subtitle">
            Follow these simple steps to run accessibility audits and review your
            results.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="container features-grid">
          <div className="feature-card">
            <h3>1. Create an account</h3>
            <p>
              Go to the Register page, create an account, and then log in to
              access the dashboard.
            </p>
          </div>
          <div className="feature-card">
            <h3>2. Run an analysis</h3>
            <p>
              From the Dashboard or Analyze page, paste a public URL and start
              an audit. It may take a few seconds to complete.
            </p>
          </div>
          <div className="feature-card">
            <h3>3. Review reports</h3>
            <p>
              Open your recent reports, check scores, and read the list of
              violations with suggestions on how to fix them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;


