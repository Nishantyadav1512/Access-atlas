import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import analyzeService from '../../services/analyzeService';
import '../../styles/Report.css';
import '../../styles/Analyzer.css';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const data = await analyzeService.getReportById(id);
      setReport(data.report);
    } catch (err) {
      setError('Failed to load report');
      console.error('Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;

    try {
      await analyzeService.deleteReport(id);
      navigate('/reports');
    } catch (error) {
      alert('Failed to delete report');
      console.error('Error deleting report:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'score-good';
    if (score >= 50) return 'score-average';
    return 'score-poor';
  };

  const getImpactClass = (impact) => `impact-${impact}`;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="report-detail-container">
        <div className="container">
          <div className="error-message">{error || 'Report not found'}</div>
          <Link to="/reports" className="btn btn-secondary">
            ← Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="report-detail-container">
      <div className="report-detail-content">

        {/* Header */}
        <div className="report-detail-header">
          <h1 className="report-detail-url">📊 {report.url}</h1>
          <div className="report-detail-meta">
            <span>🕒 Analyzed on {formatDate(report.timestamp)}</span>
            <span>📝 Report ID: {report._id}</span>
          </div>
          <div className="report-detail-actions">
            <Link to="/reports" className="btn btn-secondary">← Back to Reports</Link>
            <Link to="/analyze" className="btn btn-primary">➕ New Analysis</Link>
            <button onClick={handleDelete} className="btn btn-danger">🗑️ Delete Report</button>
          </div>
        </div>

        {/* Lighthouse Scores */}
        <div className="results-scores">
          {['accessibility', 'performance', 'bestPractices', 'seo'].map((key) => (
            <div className="score-card" key={key}>
              <div className={`score-circle ${getScoreColor(report.lighthouseScore[key])}`}>
                {report.lighthouseScore[key]}
              </div>
              <p className="score-label">{key.replace(/([A-Z])/g, ' $1')}</p>
            </div>
          ))}
        </div>

        {/* Violations */}
        <div className="violations-section">
          <div className="violations-header">
            <h3 className="violations-title">Accessibility Violations</h3>
            <span className="violations-count">
              {report.axeResults.violations.length} Issues Found
            </span>
          </div>

          {report.axeResults.violations.length === 0 ? (
            <div className="no-violations">
              <div className="no-violations-icon">✅</div>
              <p className="no-violations-text">Great! No accessibility violations found.</p>
            </div>
          ) : (
            report.axeResults.violations.map((violation, index) => (
              <div key={index} className="violation-card">
                <div className="violation-header">
                  <h4 className="violation-title">{violation.description}</h4>
                  <span className={`violation-impact ${getImpactClass(violation.impact)}`}>
                    {violation.impact}
                  </span>
                </div>

                <p className="violation-description">
                  <strong>Issue ID:</strong> {violation.id}
                </p>

                <div className="violation-help">
                  💡 <strong>How to fix:</strong> {violation.help}
                </div>

                {/* FIXED LINK */}
                <a
                  href={violation.helpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="violation-link"
                >
                  📚 Learn more →
                </a>

                {violation.nodes?.length > 0 && (
                  <div className="violation-nodes">
                    <p className="violation-nodes-title">
                      Affected elements ({violation.nodes.length}):
                    </p>

                    {violation.nodes.slice(0, 3).map((node, nodeIndex) => (
                      <div key={nodeIndex} className="violation-node">
                        {node.html}
                      </div>
                    ))}

                    {violation.nodes.length > 3 && (
                      <p style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
                        ... and {violation.nodes.length - 3} more elements
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}

          <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#2e7d32' }}>
              ✓ <strong>{report.axeResults.passes}</strong> tests passed
              {report.axeResults.incomplete > 0 && (
                <> • ⚠️ <strong>{report.axeResults.incomplete}</strong> tests need manual review</>
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
