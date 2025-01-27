import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecommendationsList from './RecommendationsList';

const UserProfileDisplay = ({ user_id, recommended_items, preferences, purchase_history }) => {
    // Component states
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [userProfileData, setUserProfileData] = useState(null);

    // Fetch user profile data when component mounts
    useEffect(() => {
        fetchUserProfile(user_id);
    }, [user_id]);

    const fetchUserProfile = async (userId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://api.example.com/users/${userId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            onProfileFetchSuccess(data);
        } catch (error) {
            onProfileFetchError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onProfileFetchSuccess = (data) => {
        setUserProfileData(data);
        // Additional success handling can be added here
    };

    const onProfileFetchError = (errorMessage) => {
        setHasError(true);
        console.error('Error fetching user profile:', errorMessage);
    };

    if (isLoading) return <div className='loading-spinner'>Loading...</div>;
    if (hasError) return <div className='error-message'>Error fetching user profile.</div>;

    return (
        <div className='user-profile-container'>
            <h2>User ID: {user_id}</h2>
            <div className='preferences-display'>
                <h3>Preferences</h3>
                {preferences && preferences.length ? preferences.join(', ') : 'No preferences available.'}
            </div>
            <div className='purchase-history-display'>
                <h3>Purchase History</h3>
                {purchase_history && purchase_history.length ? purchase_history.join(', ') : 'No purchase history available.'}
            </div>
            <RecommendationsList items={recommended_items} />
        </div>
    );
};

UserProfileDisplay.propTypes = {
    user_id: PropTypes.string.isRequired,
    preferences: PropTypes.array,
    purchase_history: PropTypes.array,
    recommended_items: PropTypes.array.isRequired,
};

export default UserProfileDisplay;