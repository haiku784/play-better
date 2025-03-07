// src/components/RecommendationList.js
import React, { useEffect, useState } from 'react';
import './RecommendationList.css';

/**
 * RecommendationList component fetches and displays a list of recommendations
 * for the user based on their gameplay data.
 */
const RecommendationList = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch recommendations from the Recommendation Service API.
     */
    const fetchRecommendations = async () => {
        try {
            const response = await fetch(`/recommendations?user_id=${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
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
        fetchRecommendations();
    }, [userId]);

    if (loading) return <div>Loading recommendations...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="recommendation-list">
            <h2>Your Recommendations</h2>
            <ul>
                {recommendations.map(rec => (
                    <li key={rec.recommendationId} className="recommendation-item">
                        <h3>{rec.type}</h3>
                        <p>{rec.details}</p>
                        <p>Rating: {rec.rating}</p>
                        <p>Review: {rec.review}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendationList;