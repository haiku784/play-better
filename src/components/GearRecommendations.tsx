import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GearRecommendation {
    id: string;
    name: string;
    reason: string;
}

const GearRecommendations: React.FC<{ userId: string }> = ({ userId }) => {
    const [recommendations, setRecommendations] = useState<GearRecommendation[]>([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const response = await axios.get(`/api/get-gear-recommendations?userId=${userId}`);
            setRecommendations(response.data);
        };
        fetchRecommendations();
    }, [userId]);

    return (
        <div>
            <h2>Your Gear Recommendations</h2>
            <ul>
                {recommendations.map(gear => (
                    <li key={gear.id}>{gear.name} - {gear.reason}</li>
                ))}
            </ul>
        </div>
    );
};

export default GearRecommendations;