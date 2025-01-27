import React, { useState } from 'react';

const UpdateUserProfileComponent = ({ onProfileUpdated }) => {
    // State variables for managing form input and status
    const [userId, setUserId] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [skillLevel, setSkillLevel] = useState('');
    const [recommendedGear, setRecommendedGear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true); // Set loading state
        setIsError(false); // Reset error state

        try {
            // API call to update user profile
            const response = await updateUserProfile({ userId, preferences, skillLevel, recommendedGear });
            setSuccessMessage(response.message); // Set success message
            onProfileUpdated(response); // Call the callback function with the response
        } catch (error) {
            setIsError(true); // Set error state
            setErrorMessage(error.message); // Capture error message
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className='input-field'
                    placeholder='User ID'
                    required
                />
                <textarea
                    value={preferences.join(', ')}
                    onChange={(e) => setPreferences(e.target.value.split(', '))}
                    className='input-field'
                    placeholder='Preferences (comma separated)'
                />
                <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className='input-field'
                >
                    <option value=''>Select Skill Level</option>
                    <option value='beginner'>Beginner</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='advanced'>Advanced</option>
                </select>
                <textarea
                    value={recommendedGear.join(', ')}
                    onChange={(e) => setRecommendedGear(e.target.value.split(', '))}
                    className='input-field'
                    placeholder='Recommended Gear (comma separated)'
                />
                <button type='submit'>Update Profile</button>
            </form>
            {isLoading && <div>Loading...</div>}
            {isError && <div className='error-message'>{errorMessage}</div>}
            {successMessage && <div className='success-message'>{successMessage}</div>}
        </div>
    );
};

// Function to trigger API call (to be implemented)
const updateUserProfile = async (data) => {
    // Here we would normally make an HTTP request to update the user profile
    // This is a mock response for demonstration purposes
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.userId) {
                resolve({ status: 'success', message: 'Profile updated successfully!' });
            } else {
                reject(new Error('Profile update failed. User ID is required.'));
            }
        }, 1000);
    });
};

export default UpdateUserProfileComponent;