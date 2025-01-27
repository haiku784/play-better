import React from 'react';

/**
 * PerformanceMetricsOverlay Component to display performance metrics overlay.
 */
const PerformanceMetricsOverlay = ({ metrics }) => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0 }}>  
            <h4>Performance Metrics</h4>
            <p>Frame Rate: {metrics.frameRate}</p>
            <p>Resolution: {metrics.resolution}</p>
        </div>
    );
};

export default PerformanceMetricsOverlay;