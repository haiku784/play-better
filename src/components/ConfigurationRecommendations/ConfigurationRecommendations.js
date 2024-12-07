// ConfigurationRecommendations.js
import React, { useState, useEffect } from 'react';

const ConfigurationRecommendations = ({ hardwareSpecs }) => {
    const [recommendedSettings, setRecommendedSettings] = useState({});

    // Function to generate recommendations based on hardware specs
    const generateRecommendations = (specs) => {
        let recommendations = {};
        // Logic to adjust game settings according to hardware specifications
        if (specs.ram >= 16) {
            recommendations.textureQuality = 'High';
        } else {
            recommendations.textureQuality = 'Medium';
        }
        // Additional settings can be adjusted here
        return recommendations;
    };

    useEffect(() => {
        // Generate recommendations whenever hardware specs change
        const settings = generateRecommendations(hardwareSpecs);
        setRecommendedSettings(settings);
    }, [hardwareSpecs]);

    return (
        <div>
            <h2>Recommended Game Settings</h2>
            <ul>
                {Object.keys(recommendedSettings).map((key) => (
                    <li key={key}>{key}: {recommendedSettings[key]}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConfigurationRecommendations;