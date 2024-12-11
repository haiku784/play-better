import React from 'react';
import FollowUnfollowButton from './FollowUnfollowButton';

// PlayerProfile component displays player's details and follow/unfollow functionality.
const PlayerProfile = ({ player }) => {
    const handleFollowChange = (isFollowed) => {
        console.log(`Player ${player.id} followed: ${isFollowed}`);
        // Add additional logic to update UI if needed
    };

    return (
        <div className="player-profile">
            <h2>{player.name}</h2>
            <p>{player.bio}</p>
            <FollowUnfollowButton playerId={player.id} initialFollowed={player.isFollowed} onFollowChange={handleFollowChange} />
        </div>
    );
};

export default PlayerProfile;