import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './UserProfileDisplay.css';

const UserProfileDisplay = ({ user_id, recommended_items, preferences, purchase_history }) => {
    // Component state to manage loading and error status
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [userProfileData, setUserProfileData] = useState(null);

    // Effect to fetch user profile data on component mount
    useEffect(() => {
        fetchUserProfile(user_id);
    }, [user_id]);

    // Function to fetch user profile from API
    const fetchUserProfile = async (user_id) => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://api.example.com/user/${user_id}`);
            const data = await response.json();
            // On successful fetch, update state and call success callback
            setUserProfileData(data);
            onProfileFetchSuccess(data);
        } catch (error) {
            setHasError(true);
            onProfileFetchError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Success callback function
    const onProfileFetchSuccess = (data) => {
        console.log('Profile fetched successfully:', data);
    };

    // Error callback function
    const onProfileFetchError = (errorMessage) => {
        console.error('Error fetching profile:', errorMessage);
    };

    // Rendering the component based on state
    return (
        <div className='user-profile-container'>
            {isLoading && <div className='loading-spinner'>Loading...</div>}
            {!isLoading && hasError && <div className='error-message'>Error loading profile data.</div>}
            {!isLoading && !hasError && userProfileData && (
                <>
                    <h2>User ID: {user_id}</h2>
                    <h3>Preferences:</h3>
                    <ul>{preferences.map((pref, index) => <li key={index}>{pref}</li>)}</ul>
                    <h3>Purchase History:</h3>
                    <ul>{purchase_history.map((purchase, index) => <li key={index}>{purchase}</li>)}</ul>
                    <h3>Recommended Items:</h3>
                    <ul>{recommended_items.map((item, index) => <li key={index}>{item}</li>)}</ul>
                </>
            )}
        </div>
    );
};

UserProfileDisplay.propTypes = {
    user_id: PropTypes.string.isRequired,
    preferences: PropTypes.array,
    purchase_history: PropTypes.array,
    recommended_items: PropTypes.array.isRequired,
};

UserProfileDisplay.defaultProps = {
    preferences: [],
    purchase_history: [],
};

export default UserProfileDisplay;