import React, { useState } from 'react';

// FollowUnfollowButton component allows users to follow or unfollow a player profile.
const FollowUnfollowButton = ({ playerId, initialFollowed, onFollowChange }) => {
    const [isFollowed, setIsFollowed] = useState(initialFollowed);

    // Function to toggle follow/unfollow state
    const handleFollowToggle = async () => {
        try {
            const response = await fetch(`/api/players/${playerId}/${isFollowed ? 'unfollow' : 'follow'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update follow status');
            }

            const result = await response.json();
            setIsFollowed(!isFollowed);
            // Call the provided callback to notify parent component
            onFollowChange(result.isFollowed);
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
    };

    return (
        <button onClick={handleFollowToggle}>
            {isFollowed ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowUnfollowButton;