import React, { useState } from 'react';

const PlayerPerformanceAnalysisForm = ({ onSubmit }) => {
    const [playerId, setPlayerId] = useState('');
    const [matchData, setMatchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [performanceMetrics, setPerformanceMetrics] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await onSubmit({ playerId, matchData });
            setPerformanceMetrics(result.performanceMetrics);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="playerId">Player ID:</label>
            <input
                type="text"
                id="playerId"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                required
            />
            <label htmlFor="matchData">Match Data:</label>
            <textarea
                id="matchData"
                value={JSON.stringify(matchData)}
                onChange={(e) => setMatchData(JSON.parse(e.target.value))}
                required
            />
            <button type="submit">Analyze Performance</button>
            {isLoading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {performanceMetrics && <div>{JSON.stringify(performanceMetrics)}</div>}
        </form>
    );
};

export default PlayerPerformanceAnalysisForm;