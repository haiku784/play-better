import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Component to fetch and display performance metrics for the report.
 */
const PerformanceMetricsAPI = () => {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // Set loading to true before fetching
                setLoading(true);
                // Make the API call to fetch performance metrics
                const response = await axios.get('/api/performance-metrics');
                // Update state with the fetched metrics
                setMetrics(response.data);
            } catch (err) {
                // Handle any errors and update the error state
                setError(err);
            } finally {
                // Set loading to false once the fetch is completed
                setLoading(false);
            }
        };

        fetchMetrics(); // Invoke the fetch function
    }, []); // Empty dependency array to run once on mount

    if (loading) return <div>Loading...</div>; // Loading state
    if (error) return <div>Error fetching metrics: {error.message}</div>; // Error state

    return (
        <div>
            <h2>Performance Metrics</h2>
            <ul>
                {metrics.map((metric, index) => (
                    <li key={index}>{metric.name}: {metric.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default PerformanceMetricsAPI;