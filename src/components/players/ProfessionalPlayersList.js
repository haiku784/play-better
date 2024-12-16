import React from 'react';

// Sample data for professional players.
const players = [
    { id: 1, name: 'Player One', position: 'Forward' },
    { id: 2, name: 'Player Two', position: 'Midfielder' },
    { id: 3, name: 'Player Three', position: 'Defender' },
    { id: 4, name: 'Player Four', position: 'Goalkeeper' },
];

// Functional component to display the list of players.
const ProfessionalPlayersList = () => {
    return (
        <div className='players-list'>
            <h2>Professional Players</h2>
            <ul>
                {players.map(player => (
                    <li key={player.id} className='player-item'>
                        <span className='player-name'>{player.name}</span> - 
                        <span className='player-position'>{player.position}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Exporting the component to be used in other parts of the application.
export default ProfessionalPlayersList;