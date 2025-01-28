import React, { useState } from 'react';

const MatchDataRetrieval = () => {
    const [matchId, setMatchId] = useState('');
    const [playerStats, setPlayerStats] = useState([]);
    const [gameEvents, setGameEvents] = useState([]);
    const [timestamp, setTimestamp] = useState('');
    const [error, setError] = useState('');

    const retrieveMatchData = async () => {
        try {
            const response = await fetch(`/api/match/${matchId}`);
            if (!response.ok) throw new Error('Failed to retrieve match data');
            const data = await response.json();
            setPlayerStats(data.player_stats);
            setGameEvents(data.game_events);
            setTimestamp(data.timestamp);
            onMatchDataRetrieved(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const onMatchDataRetrieved = (data) => {
        console.log('Match data retrieved:', data);
        // Further processing or callback actions can be implemented here.
    };

    return (
        <div className="data-retrieval-container">
            <input 
                type="text" 
                value={matchId} 
                onChange={(e) => setMatchId(e.target.value)} 
                placeholder="Enter Match ID"
                required
            />
            <button onClick={retrieveMatchData}>Retrieve Match Data</button>
            {error && <div className="error-message">{error}</div>}
            <div className="retrieval-status">
                <h2>Match ID: {matchId}</h2>
                <h3>Player Stats:</h3>
                <pre>{JSON.stringify(playerStats, null, 2)}</pre>
                <h3>Game Events:</h3>
                <pre>{JSON.stringify(gameEvents, null, 2)}</pre>
                <p>Timestamp: {timestamp}</p>
            </div>
        </div>
    );
};

export default MatchDataRetrieval;