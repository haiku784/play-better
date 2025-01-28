import React from 'react';
import PropTypes from 'prop-types';
import RecommendationItem from './RecommendationItem';
import './RecommendationList.css';

const RecommendationList = ({ recommendations, timestamp, isEmpty }) => {
    // Check if recommendations array is empty
    if (isEmpty) {
        return <p>No recommendations to display.</p>;
    }

    return (
        <div>
            <h2>Recommended E-Sport Gear</h2>
            <ul className="recommendation-list">
                {recommendations.map((item, index) => (
                    <RecommendationItem key={index} item={item} />
                ))}
            </ul>
            <p>Generated at: {timestamp}</p>
        </div>
    );
};

// Prop types for validation
RecommendationList.propTypes = {
    recommendations: PropTypes.array.isRequired,
    timestamp: PropTypes.string.isRequired,
    isEmpty: PropTypes.bool.isRequired,
};

export default RecommendationList;