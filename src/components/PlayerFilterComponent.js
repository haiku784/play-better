import React, { useState } from 'react';

// PlayerFilterComponent allows filtering of players based on their gameplay style.
const PlayerFilterComponent = ({ players }) => {
    const [filter, setFilter] = useState(''); // State to hold the current filter

    // Function to handle filter input changes
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Function to filter players based on gameplay style
    const filteredPlayers = players.filter(player =>
        player.gameplayStyle.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Player List</h2>
            <input
                type="text"
                placeholder="Filter by gameplay style"
                value={filter}
                onChange={handleFilterChange}
            />
            <ul>
                {filteredPlayers.length > 0 ? (
                    filteredPlayers.map(player => (
                        <li key={player.id}>{player.name} - {player.gameplayStyle}</li>
                    ))
                ) : (
                    <li>No players found.</li>
                )}
            </ul>
        </div>
    );
};

export default PlayerFilterComponent;