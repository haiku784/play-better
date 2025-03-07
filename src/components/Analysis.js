import React, { useEffect, useState } from 'react';
import './Analysis.css'; // Importing CSS for styling

/**
 * Analysis component for displaying gameplay analysis results.
 * This component fetches analysis data from the Analysis Service and displays it to the user.
 */
const Analysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches analysis data for a specific gameplay session.
   * @param {string} sessionId - The ID of the gameplay session to analyze.
   */
  const fetchAnalysisData = async (sessionId) => {
    try {
      const response = await fetch(`/analyze/${sessionId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch analysis data');
      }
      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Example sessionId for demonstration purposes
  useEffect(() => {
    const sessionId = 'example-session-id';
    fetchAnalysisData(sessionId);
  }, []);

  if (loading) return <div className="loading">Loading analysis...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="analysis-container">
      <h2>Gameplay Analysis Results</h2>
      <div className="metrics">
        <h3>Performance Metrics</h3>
        <ul>
          <li>Kills: {analysisData.kills}</li>
          <li>Deaths: {analysisData.deaths}</li>
          <li>Assists: {analysisData.assists}</li>
          <li>Accuracy: {analysisData.accuracy}%</li>
        </ul>
      </div>
      <div className="visualization">
        <h3>Visualizations</h3>
        {/* Placeholder for visualizations, e.g., charts */}
        <p>Visualizations will be displayed here.</p>
      </div>
    </div>
  );
};

export default Analysis;