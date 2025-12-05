import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import analyzeService from '../../services/analyzeService';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReports: 0,
    averageScore: 0,
    latestScore: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await analyzeService.getReports();
      setReports(data.reports || []);
      calculateStats(data.reports || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reportsList) => {
    const totalReports = reportsList.length;
    
    if (totalReports === 0) {
      setStats({ totalReports: 0, averageScore: 0, latestScore: 0 });
      return;
    }

    const totalScore = reportsList.reduce(
      (sum, report) => sum + (report.lighthouseScore?.accessibility || 0),
      0
    );
    const averageScore = Math.round(totalScore / totalReports);
    const latestScore = reportsList[0]?.lighthouseScore?.accessibility || 0;

    setStats({
      totalReports,
      averageScore,
      latestScore,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user?.name}! 👋</h1>
          <p className="dashboard-subtitle">
            Here's your accessibility testing overview
          </p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{stats.totalReports}</div>
            <div className="stat-label">Total Reports</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-value">{stats.averageScore}</div>
            <div className="stat-label">Average Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{stats.latestScore}</div>
            <div className="stat-label">Latest Score</div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/analyze" className="dashboard-action-btn">
            ➕ Analyze New Website
          </Link>
        </div>

        <div className="dashboard-recent">
          <h2 className="dashboard-recent-title">Recent Reports</h2>

          {reports.length === 0 ? (
            <div className="no-reports">
              <div className="no-reports-icon">📝</div>
              <p className="no-reports-text">
                You haven't analyzed any websites yet
              </p>
              <Link to="/analyze" className="btn btn-primary">
                Start Your First Analysis
              </Link>
            </div>
          ) : (
            <div className="recent-reports-list">
              {reports.slice(0, 5).map((report) => (
                <div key={report.id} className="recent-report-card">
                  <div className="recent-report-info">
                    <Link
                      to={`/reports/${report.id}`}
                      className="recent-report-url"
                    >
                      {report.url}
                    </Link>
                    <div className="recent-report-date">
                      {formatDate(report.timestamp)}
                    </div>
                  </div>
                  <div className="recent-report-score">
                    <div className="score-value">
                      {report.lighthouseScore?.accessibility || 0}
                    </div>
                    <div className="score-label">Accessibility</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reports.length > 5 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/reports" className="btn btn-secondary">
                View All Reports
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;