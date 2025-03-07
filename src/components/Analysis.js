import React, { useEffect, useState } from 'react';
import './Analysis.css';

/**
 * Analysis Component
 * This component fetches and displays analysis results for a specific gameplay session.
 * It allows users to view performance metrics and insights derived from their gameplay.
 */
const Analysis = ({ sessionId }) => {
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch analysis data for the given session ID.
     */
    const fetchAnalysisData = async () => {
        try {
            const response = await fetch(`/analysis/${sessionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch analysis data');
            }
            const data = await response.json();
            setAnalysisData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalysisData();
    }, [sessionId]);

    /**
     * Render loading state.
     */
    if (loading) {
        return <div className="loading">Loading analysis data...</div>;
    }

    /**
     * Render error state.
     */
    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    /**
     * Render analysis results.
     */
    return (
        <div className="analysis-container">
            <h2>Analysis Results for Session {sessionId}</h2>
            <div className="metrics">
                <h3>Performance Metrics</h3>
                <ul>
                    <li>Kill/Death Ratio: {analysisData.killDeathRatio}</li>
                    <li>Accuracy: {analysisData.accuracy}</li>
                    <li>Objectives Completed: {analysisData.objectivesCompleted}</li>
                </ul>
            </div>
            <div className="insights">
                <h3>Insights</h3>
                <p>{analysisData.insights}</p>
            </div>
        </div>
    );
};

export default Analysis;
