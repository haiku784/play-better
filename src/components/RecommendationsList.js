import React, { useState, useEffect } from 'react';

/**
 * RecommendationsList Component
 * Displays a list of recommended e-sport gear based on user profile and trends.
 */
const RecommendationsList = ({ user_id, recommendations, timestamp }) => {
    // State to manage the empty state and latest timestamp
    const [isEmpty, setIsEmpty] = useState(true);
    const [latestTimestamp, setLatestTimestamp] = useState(timestamp);

    // Effect to determine if recommendations are empty
    useEffect(() => {
        if (recommendations.length > 0) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
        setLatestTimestamp(timestamp);
    }, [recommendations, timestamp]);

    /**
     * Refresh recommendations by fetching new data based on user_id
     */
    const refreshRecommendations = async (user_id) => {
        // Fetch new recommendations from an API
        try {
            const response = await fetch(`/api/recommendations/${user_id}`);
            const data = await response.json();
            // Update state with new recommendations
            return { newRecommendations: data.recommendations };
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            return { newRecommendations: [] };
        }
    };

    return (
        <div className="recommendations-container">
            <h2>Recommendations</h2>
            {isEmpty ? (<p>No recommendations available.</p>) : (
                <ul>
                    {recommendations.map((item, index) => (
                        <li key={index} className="recommendation-item">{item}</li>
                    ))}
                </ul>
            )}
            <p className="timestamp-style">Last Updated: {latestTimestamp}</p>
        </div>
    );
};

export default RecommendationsList;