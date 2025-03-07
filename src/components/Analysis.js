import React, { useState, useEffect } from 'react';
import './Analysis.css';

/**
 * Analysis Component
 * This component fetches and displays performance analysis metrics for gameplay sessions.
 */
const Analysis = () => {
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
        <div className="analysis-container">
            <h2>Performance Analysis</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            <div className="metrics">
                {performanceMetrics.length > 0 ? (
                    performanceMetrics.map((metric) => (
                        <div key={metric.sessionId} className="metric-card">
                            <h3>Session ID: {metric.sessionId}</h3>
                            <p>Kills: {metric.kills}</p>
                            <p>Deaths: {metric.deaths}</p>
                            <p>Assists: {metric.assists}</p>
                            <p>Accuracy: {metric.accuracy}%</p>
                        </div>
                    ))
                ) : (
                    <p>No performance metrics available.</p>
                )}
            </div>
        </div>
    );
};

export default Analysis;