// PerformanceMetrics.js
// This component displays performance metrics dynamically in the UI.
import React, { useEffect, useState } from 'react';

const PerformanceMetrics = () => {
    const [metrics, setMetrics] = useState({});

    const fetchMetrics = async () => {
        const response = await fetch('/api/performance-metrics'); // API endpoint to fetch metrics
        const data = await response.json();
        setMetrics(data);
    };

    useEffect(() => {
        fetchMetrics();
        const intervalId = setInterval(fetchMetrics, 5000); // update metrics every 5 seconds
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='performance-metrics'>
            <h2>Performance Metrics</h2>
            <p>Score: {metrics.score}</p>
            <p>Accuracy: {metrics.accuracy}</p>
            <p>Performance Rating: {metrics.rating}</p>
        </div>
    );
};

export default PerformanceMetrics;