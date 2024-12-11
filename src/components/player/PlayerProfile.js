import React from 'react';

// PlayerProfile Component to display individual player information
const PlayerProfile = ({ player }) => {
    return (
        <div className="player-profile">
            <h2>{player.name}</h2>
            <p>Position: {player.position}</p>
            <p>Team: {player.team}</p>
            <p>Stats:</p>
            <ul>
                <li>Games Played: {player.stats.gamesPlayed}</li>
                <li>Goals: {player.stats.goals}</li>
                <li>Assists: {player.stats.assists}</li>
            </ul>
        </div>
    );
};

export default PlayerProfile;