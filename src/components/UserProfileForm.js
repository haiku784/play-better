import React, { useState } from 'react';

const UserProfileForm = ({ onSuccess, onError }) => {
    // State variables for the form inputs and submission status
    const [userId, setUserId] = useState('');
    const [preferredGames, setPreferredGames] = useState([]);
    const [gamingStyles, setGamingStyles] = useState([]);
    const [profilePicture, setProfilePicture] = useState('');
    const [bio, setBio] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        // Simulated API call for profile creation
        try {
            const response = await api.createProfile({ userId, preferredGames, gamingStyles, profilePicture, bio });
            setSubmissionStatus('success');
            setIsSubmitting(false);
            onSuccess(response.profileId);
        } catch (error) {
            setSubmissionStatus('error');
            setErrorMessage(error.message);
            setIsSubmitting(false);
            onError(error.message);
        }
    };

    // Reset form fields to their initial state
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
                {/* Add input fields for preferredGames and gamingStyles here */}
                <button type="submit" disabled={isSubmitting} className="submit-button">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
            {submissionStatus && <div className={`status-message ${submissionStatus}`}>{submissionStatus === 'error' ? errorMessage : 'Profile created successfully!'}</div>}
        </div>
    );
};

export default UserProfileForm;