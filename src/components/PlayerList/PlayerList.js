import React from 'react';
import PropTypes from 'prop-types';
import './PlayerList.css'; // Importing the CSS for styling

const PlayerList = ({ players }) => {
    return (
        <div className="player-list">
            <h2>Player List</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id} className="player-item">
                        <span className="player-name">{player.name}</span>
                        <span className="player-score">Score: {player.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

PlayerList.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default PlayerList;