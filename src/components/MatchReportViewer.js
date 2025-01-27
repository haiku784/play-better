import React, { useState } from 'react';

// MatchReportViewer component fetches and displays match report based on matchId
const MatchReportViewer = () => {
    const [matchId, setMatchId] = useState(''); // State for storing matchId
    const [report, setReport] = useState(null); // State for storing fetched report
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    // Function to fetch match report data
    const fetchMatchReport = async () => {
        if (!matchId) {
            setErrorMessage('Match ID is required!');
            return;
        }
        setIsLoading(true); // Set loading state to true
        setErrorMessage(''); // Clear previous error message

        try {
            const response = await fetch(`https://api.example.com/match/${matchId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            onReportFetchSuccess(data); // Call success callback with data
        } catch (error) {
            onReportFetchError(error.message); // Call error callback with error message
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Callback for successful report retrieval
    const onReportFetchSuccess = (data) => {
        setReport(data); // Set the report state with the fetched data
    };

    // Callback for report retrieval error
    const onReportFetchError = (error) => {
        setErrorMessage(error); // Set the error message state
    };

    return (
        <div className="report-viewer">
            <input
                type="text"
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)}
                placeholder="Enter Match ID"
                className="match-id-input"
            />
            <button onClick={fetchMatchReport} className="fetch-report-button">Fetch Report</button>
            {isLoading && <p className="loading-indicator">Loading...</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {report && <div className="match-report-display">{JSON.stringify(report)}</div>}
        </div>
    );
};

export default MatchReportViewer;