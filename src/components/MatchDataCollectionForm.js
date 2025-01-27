import React, { useState } from 'react';

const MatchDataCollectionForm = ({ onSuccess, onError }) => {
    // State variables for the form
    const [matchId, setMatchId] = useState('');
    const [playerStats, setPlayerStats] = useState([]);
    const [gameEvents, setGameEvents] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handles form submission
    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/matchdata', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ matchId, playerStats, gameEvents })
            });
            const data = await response.json();
            setSubmissionStatus(data.status);
            if (data.status === 'success') {
                onSuccess(data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
            onError({ errorMessage: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <div>
                <label>Match ID:</label>
                <input type="text" value={matchId} onChange={(e) => setMatchId(e.target.value)} required />
            </div>
            <div>
                <label>Player Stats:</label>
                <textarea value={JSON.stringify(playerStats)} onChange={(e) => setPlayerStats(JSON.parse(e.target.value))} required></textarea>
            </div>
            <div>
                <label>Game Events:</label>
                <textarea value={JSON.stringify(gameEvents)} onChange={(e) => setGameEvents(JSON.parse(e.target.value))} required></textarea>
            </div>
            <button type="submit" disabled={isSubmitting}>Submit</button>
            {submissionStatus && <div>{submissionStatus}</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </form>
    );
};

export default MatchDataCollectionForm;