import React, { useEffect, useState } from 'react';

// GearRecommendation component fetches and displays personalized gear recommendations.
const GearRecommendation = () => {
    const [gearRecommendations, setGearRecommendations] = useState([]);

    // Fetch gear recommendations based on user's gameplay data
    useEffect(() => {
        const fetchGearRecommendations = async () => {
            try {
                const response = await fetch('/api/gear/recommendations');
                const data = await response.json();
                setGearRecommendations(data);
            } catch (error) {
                console.error('Error fetching gear recommendations:', error);
            }
        };
        fetchGearRecommendations();
    }, []);

    return (
        <div>
            <h2>Your Gear Recommendations</h2>
            <ul>
                {gearRecommendations.map((gear) => (
                    <li key={gear.id}>
                        <h3>{gear.name}</h3>
                        <p>{gear.description}</p>
                        <span>Price: ${gear.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GearRecommendation;