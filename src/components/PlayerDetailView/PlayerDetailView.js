import React from 'react';

// PlayerDetailView component receives player details as props
const PlayerDetailView = ({ player }) => {
    return (
        <div className="player-detail">
            <h2>{player.name}</h2>
            <p><strong>Gameplay Style:</strong> {player.gameplayStyle}</p>
            <a href={player.streamingSchedule} target="_blank" rel="noopener noreferrer">View Streaming Schedule</a>
        </div>
    );
};

export default PlayerDetailView;