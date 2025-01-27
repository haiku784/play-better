import React, { useState } from 'react';

// PlayerPerformanceMetrics Component
const PlayerPerformanceMetrics = () => {
    const [playerId, setPlayerId] = useState('');
    const [matchData, setMatchData] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [metrics, setMetrics] = useState(null);

    // Function to validate inputs
    const validateInputs = () => {
        const isValid = playerId.trim() !== '' && matchData.length > 0;
        setIsValid(isValid);
        return isValid;
    };

    // Function to calculate performance metrics
    const calculatePerformanceMetrics = () => {
        if (!validateInputs()) return;
        // Mocking performance calculation
        const performanceMetrics = {
            scoringEfficiency: Math.random().toFixed(2),
            assistRatio: Math.random().toFixed(2),
            defensiveContributions: Math.random().toFixed(2),
        };
        setMetrics({ playerId, performanceMetrics });
        onMetricsCalculated({ metrics: performanceMetrics });
    };

    // Callback function for handling calculated metrics
    const onMetricsCalculated = (data) => {
        console.log('Metrics calculated:', data.metrics);
    };

    return (
        <div className="performance-metrics-container">
            <input
                type="text"
                placeholder="Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                className="inputField"
            />
            <textarea
                placeholder="Match Data"
                value={matchData}
                onChange={(e) => setMatchData(e.target.value.split(','))}
                className="inputField"
            />
            <button onClick={calculatePerformanceMetrics} className="buttonStyle">Calculate Metrics</button>
            {metrics && (
                <div className="metricsContainer">
                    <h3>Performance Metrics for {metrics.playerId}</h3>
                    <p>Scoring Efficiency: {metrics.performanceMetrics.scoringEfficiency}</p>
                    <p>Assist Ratio: {metrics.performanceMetrics.assistRatio}</p>
                    <p>Defensive Contributions: {metrics.performanceMetrics.defensiveContributions}</p>
                </div>
            )}
        </div>
    );
};

export default PlayerPerformanceMetrics;