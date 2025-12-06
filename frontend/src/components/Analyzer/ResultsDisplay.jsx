import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Analyzer.css';

const ResultsDisplay = ({ results, onNewAnalysis }) => {
  const { data } = results;

  const getScoreColor = (score) => {
    if (score >= 90) return 'score-good';
    if (score >= 50) return 'score-average';
    return 'score-poor';
  };

  const getImpactClass = (impact) => {
    return `impact-${impact}`;
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

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-url">📊 {data.url}</h2>
        <p className="results-date">
          Analyzed on {formatDate(data.timestamp)}
        </p>
      </div>

      {/* Lighthouse Scores */}
      <div className="results-scores">
        <div className="score-card">
          <div className={`score-circle ${getScoreColor(data.lighthouseScore.accessibility)}`}>
            {data.lighthouseScore.accessibility}
          </div>
          <p className="score-label">Accessibility</p>
        </div>

        <div className="score-card">
          <div className={`score-circle ${getScoreColor(data.lighthouseScore.performance)}`}>
            {data.lighthouseScore.performance}
          </div>
          <p className="score-label">Performance</p>
        </div>

        <div className="score-card">
          <div className={`score-circle ${getScoreColor(data.lighthouseScore.bestPractices)}`}>
            {data.lighthouseScore.bestPractices}
          </div>
          <p className="score-label">Best Practices</p>
        </div>

        <div className="score-card">
          <div className={`score-circle ${getScoreColor(data.lighthouseScore.seo)}`}>
            {data.lighthouseScore.seo}
          </div>
          <p className="score-label">SEO</p>
        </div>
      </div>

      {/* Axe-core Violations */}
      <div className="violations-section">
        <div className="violations-header">
          <h3 className="violations-title">Accessibility Violations</h3>
          <span className="violations-count">
            {data.axeResults.violations.length} Issues Found
          </span>
        </div>

        {data.axeResults.violations.length === 0 ? (
          <div className="no-violations">
            <div className="no-violations-icon">✅</div>
            <p className="no-violations-text">
              Great! No accessibility violations found.
            </p>
          </div>
        ) : (
          data.axeResults.violations.map((violation, index) => (
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

              <a
                href={violation.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="violation-link"
              >
                📚 Learn more →
              </a>

              {violation.nodes && violation.nodes.length > 0 && (
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
            ✓ <strong>{data.axeResults.passes}</strong> tests passed
            {data.axeResults.incomplete > 0 && (
              <> • ⚠️ <strong>{data.axeResults.incomplete}</strong> tests need manual review</>
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button onClick={onNewAnalysis} className="btn btn-primary">
          ➕ Analyze Another Website
        </button>
        <Link to="/reports" className="btn btn-secondary">
          📋 View All Reports
        </Link>
        <Link to="/dashboard" className="btn btn-secondary">
          🏠 Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ResultsDisplay;