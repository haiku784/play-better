import React from 'react';

const GearRecommendations = ({ recommendations }) => {
    return (
        <div>
            <h2>Gear Recommendations</h2>
            <ul>
                {recommendations.map((gear, index) => (
                    <li key={index}>{gear}</li>
                ))}
            </ul>
        </div>
    );
};

export default GearRecommendations;
