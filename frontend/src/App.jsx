import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Lavout/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AnalyzerForm from './components/Analyzer/AnalyzerForm';
import ReportsList from './components/Reports/ReportsList';
import ReportDetail from './components/Reports/ReportDetail';
import PrivateRoute from './untils/PrivateRoute';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/analyze"
            element={
              <PrivateRoute>
                <AnalyzerForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <ReportsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports/:id"
            element={
              <PrivateRoute>
                <ReportDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
