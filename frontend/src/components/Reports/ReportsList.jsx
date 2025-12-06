import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import analyzeService from '../../services/analyzeService';
import '../../styles/Report.css';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await analyzeService.getReports();
      setReports(data.reports || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      await analyzeService.deleteReport(id);
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFilteredReports = () => {
    let filtered = [...reports];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((report) =>
        report.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'score-high':
        filtered.sort(
          (a, b) =>
            (b.lighthouseScore?.accessibility || 0) -
            (a.lighthouseScore?.accessibility || 0)
        );
        break;
      case 'score-low':
        filtered.sort(
          (a, b) =>
            (a.lighthouseScore?.accessibility || 0) -
            (b.lighthouseScore?.accessibility || 0)
        );
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredReports = getFilteredReports();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-content">
        <div className="reports-header">
          <h1 className="reports-title">Your Accessibility Reports</h1>
          <p className="reports-subtitle">
            View and manage all your website analyses
          </p>
        </div>

        <div className="reports-stats">
          <div className="reports-stat">
            <div className="reports-stat-value">{reports.length}</div>
            <div className="reports-stat-label">Total Reports</div>
          </div>
          <div className="reports-stat">
            <div className="reports-stat-value">
              {reports.length > 0
                ? Math.round(
                    reports.reduce(
                      (sum, r) => sum + (r.lighthouseScore?.accessibility || 0),
                      0
                    ) / reports.length
                  )
                : 0}
            </div>
            <div className="reports-stat-label">Average Score</div>
          </div>
        </div>

        {reports.length > 0 && (
          <div className="reports-filters">
            <div className="reports-search">
              <input
                type="text"
                placeholder="🔍 Search by URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="reports-sort">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="score-high">Highest Score</option>
                <option value="score-low">Lowest Score</option>
              </select>
            </div>
          </div>
        )}

        {filteredReports.length === 0 ? (
          <div className="no-reports-message">
            <div className="no-reports-icon">📋</div>
            <p className="no-reports-text">
              {searchTerm
                ? 'No reports match your search'
                : "You haven't analyzed any websites yet"}
            </p>
            {!searchTerm && (
              <Link to="/analyze" className="btn btn-primary">
                Analyze Your First Website
              </Link>
            )}
          </div>
        ) : (
          <div className="reports-list">
            {filteredReports.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-card-header">
                  <div className="report-card-url">
                    <Link
                      to={`/reports/${report.id}`}
                      className="report-url-link"
                    >
                      {report.url}
                    </Link>
                    <div className="report-date">
                      {formatDate(report.timestamp)}
                    </div>
                  </div>
                  <div className="report-card-actions">
                    <Link
                      to={`/reports/${report.id}`}
                      className="report-action-btn report-view-btn"
                    >
                      👁️ View
                    </Link>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="report-action-btn report-delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                <div className="report-card-scores">
                  <div className="report-score-item">
                    <div className="report-score-value">
                      {report.lighthouseScore?.accessibility || 0}
                    </div>
                    <div className="report-score-label">Accessibility</div>
                  </div>
                  <div className="report-score-item">
                    <div className="report-score-value">
                      {report.lighthouseScore?.performance || 0}
                    </div>
                    <div className="report-score-label">Performance</div>
                  </div>
                  <div className="report-score-item">
                    <div className="report-score-value">
                      {report.lighthouseScore?.bestPractices || 0}
                    </div>
                    <div className="report-score-label">Best Practices</div>
                  </div>
                  <div className="report-score-item">
                    <div className="report-score-value">
                      {report.lighthouseScore?.seo || 0}
                    </div>
                    <div className="report-score-label">SEO</div>
                  </div>
                </div>

                <div className="report-violations-summary">
                  <div className="violations-item">
                    <span className="violations-icon">❌</span>
                    <span className="violations-text">
                      <span className="violations-count">
                        {report.violationsCount || 0}
                      </span>{' '}
                      Violations
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsList;