import React from 'react';
import PlayerProfile from './PlayerProfile';

// PlayerList component displays a list of player profiles.
const PlayerList = ({ players }) => {
    return (
        <div className="player-list">
            {players.map(player => (
                <PlayerProfile key={player.id} player={player} />
            ))}
        </div>
    );
};

export default PlayerList;