import React, { useState, useEffect } from 'react';
import './Analysis.css'; // Importing CSS for styling

/**
 * Analysis Component
 * This component fetches and displays performance metrics for a specific gameplay session.
 */
const Analysis = ({ sessionId }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch performance metrics for the given session ID.
   */
  const fetchPerformanceMetrics = async () => {
    try {
      const response = await fetch(`/performance_metrics/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch performance metrics');
      }
      const data = await response.json();
      setPerformanceMetrics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchPerformanceMetrics();
    }
  }, [sessionId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="analysis-container">
      <h2>Performance Metrics</h2>
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Assists</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {performanceMetrics.map((metric) => (
            <tr key={metric.metricId}>
              <td>{metric.kills}</td>
              <td>{metric.deaths}</td>
              <td>{metric.assists}</td>
              <td>{metric.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analysis;