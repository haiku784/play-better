// src/components/AnalysisService.js
import React, { useEffect, useState } from 'react';
import './AnalysisService.css'; // Import CSS for styling

/**
 * AnalysisService component fetches and displays analysis results for gameplay recordings.
 * It allows users to view performance metrics and reports generated from their recordings.
 */
const AnalysisService = () => {
    const [performanceMetrics, setPerformanceMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch performance metrics from the Analysis Service API.
     * This function is called when the component mounts.
     */
    const fetchPerformanceMetrics = async () => {
        try {
            const response = await fetch('/analysis/metrics');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPerformanceMetrics(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerformanceMetrics();
    }, []);

    /**
     * Render loading state, error message, or performance metrics.
     */
    return (
        <div className="analysis-service">
            <h2>Performance Metrics</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && performanceMetrics.length === 0 && <p>No metrics available.</p>}
            {!loading && !error && performanceMetrics.length > 0 && (
                <table className="metrics-table">
                    <thead>
                        <tr>
                            <th>Kills</th>
                            <th>Deaths</th>
                            <th>Assists</th>
                            <th>Accuracy</th>
                            <th>Decision Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {performanceMetrics.map((metric) => (
                            <tr key={metric.metricsId}>
                                <td>{metric.kills}</td>
                                <td>{metric.deaths}</td>
                                <td>{metric.assists}</td>
                                <td>{metric.accuracy}%</td>
                                <td>{metric.decisionScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AnalysisService;