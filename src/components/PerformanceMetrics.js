// src/components/PerformanceMetrics.js
import React, { useEffect, useState } from 'react';
import './PerformanceMetrics.css';

/**
 * PerformanceMetrics component fetches and displays performance metrics.
 * It communicates with the Gateway Service to retrieve performance data.
 */
const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState([]);

  /**
   * Fetch performance metrics from the Gateway Service.
   */
  const fetchPerformanceMetrics = async () => {
    try {
      const response = await fetch('/performance-metrics/');
      if (!response.ok) throw new Error('Failed to fetch performance metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
    }
  };

  useEffect(() => {
    fetchPerformanceMetrics();
  }, []);

  return (
    <div className="performance-metrics">
      <h2>Performance Metrics</h2>
      {metrics.length > 0 ? (
        <ul>
          {metrics.map((metric) => (
            <li key={metric.id}>{metric.description}: {metric.value}</li>
          ))}
        </ul>
      ) : (
        <p>No performance metrics available.</p>
      )}
    </div>
  );
};

export default PerformanceMetrics;
