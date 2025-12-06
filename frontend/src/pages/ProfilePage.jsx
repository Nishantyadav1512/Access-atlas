import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Your Profile</h1>
          <p className="hero-subtitle">
            View basic information about your account.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="feature-card">
            <h3>Account details</h3>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;


