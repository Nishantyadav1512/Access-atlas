import React, { useState } from 'react';
import analyzeService from '../../services/analyzeService';
import ResultsDisplay from './ResultsDisplay';
import '../../styles/Analyzer.css';

const AnalyzerForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const validateUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults(null);

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeService.analyzeUrl(url);
      setResults(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to analyze website. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (results) {
    return <ResultsDisplay results={results} onNewAnalysis={() => {
      setResults(null);
      setUrl('');
    }} />;
  }

  return (
    <div className="analyzer-container">
      <div className="analyzer-content">
        <div className="analyzer-header">
          <h1 className="analyzer-title">Analyze Website Accessibility</h1>
          <p className="analyzer-subtitle">
            Enter a URL to get a comprehensive accessibility report
          </p>
        </div>

        <div className="analyzer-form-card">
          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="analyzer-loading">
              <div className="analyzer-loading-spinner"></div>
              <p className="analyzer-loading-text">
                Analyzing website accessibility...
              </p>
              <p className="analyzer-loading-subtext">
                This may take 15-30 seconds. Please wait.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="analyzer-form">
              <div className="analyzer-input-group">
                <label className="analyzer-label">Website URL</label>
                <input
                  type="text"
                  className="analyzer-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
                <p className="analyzer-hint">
                  Make sure to include http:// or https://
                </p>
              </div>

              <button type="submit" className="analyzer-submit-btn">
                🔍 Analyze Website
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzerForm;