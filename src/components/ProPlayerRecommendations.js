import React from 'react';

const ProPlayerRecommendations = ({ players }) => {
    return (
        <div>
            <h2>Recommended Pro Players</h2>
            <ul>
                {players.map((player, index) => <li key={index}>{player.name}</li>)}
            </ul>
        </div>
    );
};

export default ProPlayerRecommendations;