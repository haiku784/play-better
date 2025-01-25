import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RecommendationsList.css';

const RecommendationsList = ({ user_id, recommendations, timestamp }) => {
    // State to handle recommendations display
    const [isEmpty, setIsEmpty] = useState(true);
    const [latestTimestamp, setLatestTimestamp] = useState('');

    useEffect(() => {
        // Update state based on recommendations prop
        setIsEmpty(recommendations.length === 0);
        setLatestTimestamp(timestamp);
    }, [recommendations, timestamp]);

    return (
        <div className="recommendations-container">
            <h2>Recommendations</h2>
            {isEmpty ? (
                <p>No recommendations available.</p>
            ) : (
                <ul>
                    {recommendations.map((item, index) => (
                        <li key={index} className="recommendation-item">{item}</li>
                    ))}
                </ul>
            )}
            <p className="timestamp-style">Last updated: {latestTimestamp}</p>
        </div>
    );
};

RecommendationsList.propTypes = {
    user_id: PropTypes.string.isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
    timestamp: PropTypes.string.isRequired,
};

export default RecommendationsList;