import React, { useState, useEffect } from 'react';
import './RecordingService.css';

/**
 * RecordingService component handles the recording of gameplay sessions.
 * It provides UI for starting and stopping recordings, and displays the status.
 */
const RecordingService = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [error, setError] = useState(null);

    /**
     * Starts the recording session by calling the Recording API.
     */
    const startRecording = async () => {
        try {
            const response = await fetch('/recording/start/', { method: 'POST' });
            if (!response.ok) throw new Error('Failed to start recording');
            const data = await response.json();
            setSessionId(data.sessionId);
            setIsRecording(true);
        } catch (err) {
            setError(err.message);
        }
    };

    /**
     * Stops the recording session by calling the Recording API.
     */
    const stopRecording = async () => {
        try {
            const response = await fetch(`/recording/stop/${sessionId}/`, { method: 'POST' });
            if (!response.ok) throw new Error('Failed to stop recording');
            const data = await response.json();
            console.log('Recording stopped:', data);
            setIsRecording(false);
            setSessionId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="recording-service">
            <h2>Recording Service</h2>
            {error && <div className="error">Error: {error}</div>}
            <div className="status">
                {isRecording ? (
                    <div>
                        <p>Recording in progress...</p>
                        <button onClick={stopRecording}>Stop Recording</button>
                    </div>
                ) : (
                    <div>
                        <p>No recording in progress.</p>
                        <button onClick={startRecording}>Start Recording</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecordingService;