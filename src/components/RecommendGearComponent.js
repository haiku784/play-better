import React, { useState } from 'react';

/**
 * RecommendGearComponent allows users to input their user ID and gaming type to get gear recommendations.
 */
const RecommendGearComponent = () => {
    // Component state variables
    const [user_id, setUserId] = useState('');
    const [gaming_type, setGamingType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [recommendedGear, setRecommendedGear] = useState([]);

    /**
     * Function to handle gear recommendation based on user profile.
     */
    const recommendGearBasedOnProfile = async () => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        try {
            const response = await fetch(`/api/recommendGear?user_id=${user_id}&gaming_type=${gaming_type}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch recommendations.');
            }

            setRecommendedGear(data.recommended_gear);
            onGearRecommended(data.recommended_gear);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Callback to handle actions after getting gear recommendations.
     * @param {Array} recommended_gear - An array of recommended gear.
     */
    const onGearRecommended = (recommended_gear) => {
        console.log('Recommended gear:', recommended_gear);
    };

    return (
        <div className="form-container">
            <input
                type="text"
                value={user_id}
                onChange={(e) => setUserId(e.target.value)}
                className="input-field"
                placeholder="User ID"
                required
            />
            <select
                value={gaming_type}
                onChange={(e) => setGamingType(e.target.value)}
                className="input-field"
                required
            >
                <option value="">Select Gaming Type</option>
                <option value="FPS">FPS</option>
                <option value="RPG">RPG</option>
                <option value="MOBA">MOBA</option>
            </select>
            <button
                type="button"
                onClick={recommendGearBasedOnProfile}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Get Recommendations'}
            </button>
            {isError && <div className="error-message">{errorMessage}</div>}
            <ul className="recommended-gear-list">
                {recommendedGear.map((gear, index) => (
                    <li key={index}>{gear}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendGearComponent;