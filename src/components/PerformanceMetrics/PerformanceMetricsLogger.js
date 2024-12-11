import React, { useEffect, useState } from 'react';

/**
 * PerformanceMetricsLogger is a React component that logs and displays
 * the performance metrics and latency before and after optimizations.
 */
const PerformanceMetricsLogger = () => {
    const [beforeMetrics, setBeforeMetrics] = useState(null);
    const [afterMetrics, setAfterMetrics] = useState(null);

    // Function to simulate capturing performance metrics
    const captureMetrics = () => {
        // Simulate a latency measurement (in milliseconds)
        return Math.floor(Math.random() * 100) + 1; // random value between 1 and 100
    };

    // Effect to capture metrics on component mount
    useEffect(() => {
        // Capture before optimization metrics
        const before = captureMetrics();
        setBeforeMetrics(before);
        console.log('Before optimization latency: ', before);

        // Simulate optimization process
        const optimize = () => {
            // Simulate a delay for the optimization process
            return new Promise((resolve) => setTimeout(resolve, 2000));
        };

        // Capture after optimization metrics
        optimize().then(() => {
            const after = captureMetrics();
            setAfterMetrics(after);
            console.log('After optimization latency: ', after);
        });
    }, []);

    return (
        <div>
            <h1>Performance Metrics Logger</h1>
            <h2>Before Optimization: {beforeMetrics} ms</h2>
            <h2>After Optimization: {afterMetrics} ms</h2>
        </div>
    );
};

export default PerformanceMetricsLogger;