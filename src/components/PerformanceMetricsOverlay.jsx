import React from 'react';

const PerformanceMetricsOverlay = ({ metrics }) => {
    return <div>Performance Metrics: {JSON.stringify(metrics)}</div>;
};

export default PerformanceMetricsOverlay;