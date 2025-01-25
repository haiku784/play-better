import React, { useState } from 'react';

const UserProfileForm = ({ onSuccess, onError }) => {
    // Define state variables for form fields and submission status
    const [userId, setUserId] = useState('');
    const [preferredGames, setPreferredGames] = useState([]);
    const [gamingStyles, setGamingStyles] = useState([]);
    const [profilePicture, setProfilePicture] = useState('');
    const [bio, setBio] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsSubmitting(true);
        setSubmissionStatus('');
        setErrorMessage('');

        // Mocking a profile creation API request
        try {
            const response = await createProfile({ userId, preferredGames, gamingStyles, profilePicture, bio });
            setSubmissionStatus('success');
            onSuccess(response.profileId);
        } catch (error) {
            setSubmissionStatus('error');
            setErrorMessage(error.message);
            onError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Function to handle form reset
    const handleReset = () => {
        setUserId('');
        setPreferredGames([]);
        setGamingStyles([]);
        setProfilePicture('');
        setBio('');
        setSubmissionStatus('');
        setErrorMessage('');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required placeholder="User ID" />
                <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} placeholder="Profile Picture URL" />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
                <button type="submit" className="submit-button" disabled={isSubmitting}>Submit</button>
                <button type="button" onClick={handleReset}>Reset</button>
                {submissionStatus && <p className={`status-message ${submissionStatus}`}>{submissionStatus === 'success' ? 'Profile created successfully!' : errorMessage}</p>}
            </form>
        </div>
    );
};

// Mock function simulating API call for profile creation
const createProfile = async (profileData) => {
    // Simulate successful API call
    return new Promise((resolve) => {
        setTimeout(() => resolve({ profileId: '12345' }), 1000);
    });
};

export default UserProfileForm;