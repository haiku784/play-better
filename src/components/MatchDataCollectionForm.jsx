import React, { useState } from 'react';

// Match Data Collection Form Component
const MatchDataCollectionForm = ({ onSuccess, onError }) => {
    // State to manage form inputs and submission status
    const [matchId, setMatchId] = useState('');
    const [playerStats, setPlayerStats] = useState([]);
    const [gameEvents, setGameEvents] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        // Prepare data for submission
        const data = { matchId, playerStats, gameEvents };

        try {
            const response = await fetch('/api/match-data', {  // Assume an API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            // Check response and call the corresponding callback
            if (response.ok) {
                setSubmissionStatus('success');
                onSuccess(result);
            } else {
                setSubmissionStatus('error');
                setErrorMessage(result.message);
                onError(result.message);
            }
        } catch (error) {
            setSubmissionStatus('error');
            setErrorMessage('Network error, please try again later.');
            onError('Network error, please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmission} className="match-data-form">
            <div>
                <label htmlFor="matchId">Match ID:</label>
                <input type="text" id="matchId" value={matchId} onChange={(e) => setMatchId(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="playerStats">Player Stats:</label>
                <textarea id="playerStats" value={JSON.stringify(playerStats)} onChange={(e) => setPlayerStats(JSON.parse(e.target.value))} required />
            </div>
            <div>
                <label htmlFor="gameEvents">Game Events:</label>
                <textarea id="gameEvents" value={JSON.stringify(gameEvents)} onChange={(e) => setGameEvents(JSON.parse(e.target.value))} required />
            </div>
            <button type="submit" disabled={isSubmitting}>Submit</button>
            {isSubmitting && <p>Submitting...</p>}
            {submissionStatus && <p>Status: {submissionStatus}</p>}
            {errorMessage && <p className="error">Error: {errorMessage}</p>}
        </form>
    );
};

export default MatchDataCollectionForm;