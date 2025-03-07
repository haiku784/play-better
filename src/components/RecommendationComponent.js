import React, { useState, useEffect } from 'react';
import './Recommendation.css';

/**
 * RecommendationComponent fetches and displays hardware and configuration recommendations
 * based on user preferences and performance metrics.
 */
const RecommendationComponent = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch recommendations from the Recommendation Service API.
     */
    const fetchRecommendations = async () => {
        try {
            const response = await fetch('/recommendations/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecommendations(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    if (loading) {
        return <div className="loading">Loading recommendations...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="recommendation-container">
            <h2>Recommendations</h2>
            <ul className="recommendation-list">
                {recommendations.map((rec) => (
                    <li key={rec.recommendationId} className="recommendation-item">
                        <h3>{rec.hardware}</h3>
                        <p>{rec.gameConfig}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendationComponent;