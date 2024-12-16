import React from 'react';

const PlayerDetailView = ({ player }) => {
    // URL for educational resources related to the player
    const educationalResourcesUrl = 'https://www.example.com/educational-resources';

    return (
        <div className="player-detail-view">
            <h2>{player.name}</h2>
            <p>Position: {player.position}</p>
            <p>Team: {player.team}</p>
            <a href={educationalResourcesUrl} target="_blank" rel="noopener noreferrer">
                View Educational Resources
            </a>
        </div>
    );
};

export default PlayerDetailView;