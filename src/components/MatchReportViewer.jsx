import React, { useState } from 'react';
import './MatchReportViewer.css';

const MatchReportViewer = () => {
    const [matchId, setMatchId] = useState(''); // State to hold the Match ID
    const [report, setReport] = useState(null); // State to hold the fetched report
    const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    // Function to fetch match report based on matchId
    const fetchMatchReport = async () => {
        if (!matchId) return; // Validate that matchId is provided
        setIsLoading(true); // Set loading to true
        setErrorMessage(''); // Clear previous error messages

        try {
            const response = await fetch(`/api/matchreport/${matchId}`); // API call to fetch report
            if (!response.ok) throw new Error('Failed to fetch report'); // Handle HTTP errors
            const data = await response.json(); // Parse JSON data
            setReport(data.report); // Set report data
            onReportFetchSuccess(data.report); // Callback on success
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            onReportFetchError(error.message); // Callback on error
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Callback executed when report is fetched successfully
    const onReportFetchSuccess = (report) => {
        console.log('Report fetched successfully:', report); // Log success
    };

    // Callback executed when there is an error fetching the report
    const onReportFetchError = (error) => {
        console.error('Error fetching report:', error); // Log error
    };

    return (
        <div className="match-report-viewer">
            <input 
                type="text" 
                placeholder="Enter Match ID" 
                value={matchId} 
                onChange={(e) => setMatchId(e.target.value)} 
                className="match-id-input" 
            />
            <button onClick={fetchMatchReport} className="fetch-report-button">Fetch Report</button>
            {isLoading && <div className="loading-indicator">Loading...</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {report && <div className="match-report-display">{JSON.stringify(report)}</div>}
        </div>
    );
};

export default MatchReportViewer;