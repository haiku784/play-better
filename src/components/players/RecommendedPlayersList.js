import React from 'react';

// A functional component to display a list of recommended players
const RecommendedPlayersList = ({ players }) => {
    // Check if players are available
    if (!players || players.length === 0) {
        return <div>No recommendations available.</div>;
    }

    return (
        <div>
            <h2>Recommended Players</h2>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        <h3>{player.name}</h3>
                        <p>Position: {player.position}</p>
                        <p>Team: {player.team}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendedPlayersList;