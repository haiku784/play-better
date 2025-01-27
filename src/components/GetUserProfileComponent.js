import React, { useState } from 'react';

const GetUserProfileComponent = ({ onProfileRetrieved }) => {
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    const getUserProfile = async () => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        try {
            const response = await fetch(`https://api.example.com/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await response.json();
            setUserProfile(data);
            onProfileRetrieved(data);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getUserProfile();
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                    className="input-field" 
                    placeholder="Enter User ID" 
                    required
                />
                <button type="submit">Get User Profile</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {isError && <p className="error-message">{errorMessage}</p>}
            {userProfile && <div>{JSON.stringify(userProfile)}</div>}
        </div>
    );
};

export default GetUserProfileComponent;