import React, { useState } from 'react';

const MatchDataCollector = ({ onDataCollected }) => {  
    const [matchId, setMatchId] = useState('');  
    const [playerStats, setPlayerStats] = useState([]);  
    const [gameEvents, setGameEvents] = useState([]);  
    const [timestamp, setTimestamp] = useState('');  
    const [statusMessage, setStatusMessage] = useState('');  

    const collectMatchData = async () => {  
        try {  
            const response = await fetch('/api/match-data', {  
                method: 'POST',  
                headers: { 'Content-Type': 'application/json' },  
                body: JSON.stringify({ match_id: matchId, player_stats: playerStats, game_events: gameEvents, timestamp })  
            });
            const data = await response.json();
            setStatusMessage(data.message);
            onDataCollected(data);
        } catch (error) {  
            setStatusMessage('Error collecting data.');  
            console.error(error);  
        }  
    };  

    return (
        <div className="data-collector-container">
            <input type="text" value={matchId} placeholder="Match ID" onChange={(e) => setMatchId(e.target.value)} />
            <input type="text" value={timestamp} placeholder="Timestamp" onChange={(e) => setTimestamp(e.target.value)} />
            {/* Additional inputs for player stats and game events would be added here. */}
            <button onClick={collectMatchData}>Collect Match Data</button>
            <div className="status-message">{statusMessage}</div>
        </div>
    );
};

export default MatchDataCollector;