import React from 'react';

const GearRecommendations = ({ recommendations }) => {
    return (
        <div>
            <h2>Recommended Gear</h2>
            <ul>
                {recommendations.map((gear, index) => <li key={index}>{gear.name} - ${gear.price}</li>)}
            </ul>
        </div>
    );
};

export default GearRecommendations;