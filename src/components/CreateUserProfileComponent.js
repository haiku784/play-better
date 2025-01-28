import React, { useState } from 'react';

const CreateUserProfileComponent = ({ onProfileCreated }) => {
    // State management for the form and feedback messages
    const [userId, setUserId] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [skillLevel, setSkillLevel] = useState('');
    const [recommendedGear, setRecommendedGear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setIsLoading(true); // Indicate loading state

        try {
            const response = await createUserProfile({ userId, preferences, skillLevel, recommendedGear });
            setSuccessMessage(response.message);
            onProfileCreated(response.status, response.message); // Callback after profile creation
        } catch (error) {
            setIsError(true);
            setErrorMessage('Failed to create profile.');
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    // Mock API function for creating user profile
    const createUserProfile = async ({ userId, preferences, skillLevel, recommendedGear }) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ status: 'success', message: 'Profile created successfully!' });
            }, 2000);
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='User ID' value={userId} onChange={(e) => setUserId(e.target.value)} required />
                <textarea placeholder='Gaming Preferences' onChange={(e) => setPreferences(e.target.value.split(','))} required />
                <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} required>
                    <option value=''>Select Skill Level</option>
                    <option value='beginner'>Beginner</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='advanced'>Advanced</option>
                </select>
                <button type='submit'>Create Profile</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {isError && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default CreateUserProfileComponent;