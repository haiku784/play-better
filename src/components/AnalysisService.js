// src/components/AnalysisService.js
import React, { useEffect, useState } from 'react';
import './AnalysisService.css';

/**
 * AnalysisService component fetches and displays performance metrics
 * from the Analysis Service.
 */
const AnalysisService = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch performance metrics from the Analysis Service API.
   */
  const fetchPerformanceMetrics = async () => {
    try {
      const response = await fetch('/performance-metrics/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
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
    fetchPerformanceMetrics();
  }, []);

  return (
    <div className="analysis-service">
      <h1>Performance Metrics</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {performanceMetrics.map((metric) => (
          <li key={metric.id} className="metric-item">
            <strong>{metric.name}:</strong> {metric.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisService;