import React from 'react';

const ConfigRecommendations = ({ recommendations }) => {
    return (
        <div>
            <h2>Configuration Recommendations</h2>
            <ul>
                {recommendations.map((config, index) => <li key={index}>{config}</li>)}
            </ul>
        </div>
    );
};

export default ConfigRecommendations;