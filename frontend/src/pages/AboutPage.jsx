import React from 'react';
import '../styles/Home.css';

const AboutPage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">About AccessAtlas</h1>
          <p className="hero-subtitle">
            This project helps you find and fix accessibility issues on your
            websites using automated audits powered by Lighthouse and Axe-core.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="container features-grid">
          <div className="feature-card">
            <h3>Why accessibility matters</h3>
            <p>
              Accessible websites are easier to use for everyone, including
              people with disabilities, users on mobile devices, and slow
              networks.
            </p>
          </div>
          <div className="feature-card">
            <h3>How this tool helps</h3>
            <p>
              You get clear scores and detailed violation lists so you can
              understand what needs attention and where to start.
            </p>
          </div>
          <div className="feature-card">
            <h3>For developers & teams</h3>
            <p>
              Use reports in your workflow to review changes, prevent
              regressions, and continuously improve accessibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;


