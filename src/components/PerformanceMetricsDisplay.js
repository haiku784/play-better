import React from 'react';
import PropTypes from 'prop-types';
import './PerformanceMetricsDisplay.css';

const PerformanceMetricsDisplay = ({ isVisible, performanceMetrics }) => {
    // Render nothing if the section is not visible
    if (!isVisible) return null;

    return (
        <div className="performance-metrics">
            <h2 className="metrics-title">Performance Metrics</h2>
            <div className="metrics-overview">
                <div className="metric">
                    <span className="metric-icon goals-icon" />
                    <span className="metric-value">{performanceMetrics.goalsScored} Goals Scored</span>
                </div>
                <div className="metric">
                    <span className="metric-icon assists-icon" />
                    <span className="metric-value">{performanceMetrics.assistsMade} Assists Made</span>
                </div>
                <div className="metric">
                    <span className="metric-icon accuracy-icon" />
                    <span className="metric-value">{performanceMetrics.passAccuracy}% Pass Accuracy</span>
                </div>
                <div className="metric">
                    <span className="metric-icon rating-icon" />
                    <span className="metric-value">Player Rating: {performanceMetrics.playerRating}</span>
                </div>
            </div>
        </div>
    );
};

PerformanceMetricsDisplay.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    performanceMetrics: PropTypes.shape({
        goalsScored: PropTypes.number.isRequired,
        assistsMade: PropTypes.number.isRequired,
        passAccuracy: PropTypes.number.isRequired,
        playerRating: PropTypes.number.isRequired,
    }).isRequired,
};

export default PerformanceMetricsDisplay;