import React, { useEffect, useState } from 'react';
import './Recommendation.css';

/**
 * Recommendation Component
 * This component fetches and displays personalized health recommendations for the user.
 */
const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5000/recommendations'; // Replace with your API URL

    /**
     * Fetch recommendations from the Recommendation Service API.
     */
    const fetchRecommendations = async () => {
        try {
            const response = await fetch(API_URL);
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

    if (loading) return <div className="loading">Loading recommendations...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="recommendation-container">
            <h2>Personalized Health Recommendations</h2>
            <ul className="recommendation-list">
                {recommendations.map(rec => (
                    <li key={rec.id} className="recommendation-item">
                        <h3>{rec.title}</h3>
                        <p>{rec.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendation;