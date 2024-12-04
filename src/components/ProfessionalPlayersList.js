import React, { useEffect, useState } from 'react';

const ProfessionalPlayersList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch('/api/professional-players');
      const data = await response.json();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Professional Players to Follow</h1>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessionalPlayersList;