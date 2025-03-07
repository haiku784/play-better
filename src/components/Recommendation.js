import React, { useEffect, useState } from 'react';
import './Recommendation.css';

/**
 * Recommendation Component
 * This component fetches and displays game recommendations based on user preferences.
 */
const Recommendation = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch recommendations from the Recommendation Service.
     * @param {string} userId - The ID of the user for whom to fetch recommendations.
     */
    const fetchRecommendations = async () => {
        try {
            const response = await fetch(`/recommendations/?user_id=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }
            const data = await response.json();
            setRecommendations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchRecommendations();
        }
    }, [userId]);

    /**
     * Render loading state.
     */
    const renderLoading = () => <div className="loading">Loading recommendations...</div>;

    /**
     * Render error state.
     */
    const renderError = () => <div className="error">Error: {error}</div>;

    /**
     * Render recommendations list.
     */
    const renderRecommendations = () => (
        <ul className="recommendation-list">
            {recommendations.map(rec => (
                <li key={rec.id} className="recommendation-item">
                    <h3>{rec.title}</h3>
                    <p>{rec.description}</p>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="recommendation-container">
            <h2>Game Recommendations</h2>
            {loading ? renderLoading() : error ? renderError() : renderRecommendations()}
        </div>
    );
};

export default Recommendation;