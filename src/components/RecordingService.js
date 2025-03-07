// src/components/RecordingService.js
import React, { useEffect, useState } from 'react';
import './RecordingService.css';

/**
 * RecordingService component handles the recording functionalities.
 * It allows users to start, stop, and view recordings.
 */
const RecordingService = () => {
    const [recordings, setRecordings] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    /**
     * Fetches the list of recordings from the server.
     */
    const fetchRecordings = async () => {
        const response = await fetch('/recordings');
        const data = await response.json();
        setRecordings(data);
    };

    /**
     * Starts a new recording.
     */
    const startRecording = async () => {
        setIsRecording(true);
        // Call the API to start recording
        await fetch('/recordings/start', { method: 'POST' });
    };

    /**
     * Stops the current recording.
     */
    const stopRecording = async () => {
        setIsRecording(false);
        // Call the API to stop recording
        await fetch('/recordings/stop', { method: 'POST' });
        fetchRecordings(); // Refresh recordings after stopping
    };

    useEffect(() => {
        fetchRecordings();
    }, []);

    return (
        <div className="recording-service">
            <h2>Recording Service</h2>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <h3>Recordings</h3>
            <ul>
                {recordings.map((recording) => (
                    <li key={recording.recordingId}>
                        {recording.gameTitle} - {recording.date} ({recording.duration} mins)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecordingService;