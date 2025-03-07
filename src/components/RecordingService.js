import React, { useEffect, useState } from 'react';
import './RecordingService.css'; // Importing CSS for styling

/**
 * RecordingService component handles the recording of gameplay sessions.
 * It allows users to start and stop recordings and displays the status of the current session.
 */
const RecordingService = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [sessionTitle, setSessionTitle] = useState('');
    const [recordings, setRecordings] = useState([]);

    /**
     * Fetches the list of recorded sessions from the backend.
     */
    const fetchRecordings = async () => {
        const response = await fetch('/sessions/');
        const data = await response.json();
        setRecordings(data);
    };

    /**
     * Starts a new recording session.
     */
    const startRecording = async () => {
        const response = await fetch('/sessions/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title: sessionTitle }),
        });
        if (response.ok) {
            setIsRecording(true);
            fetchRecordings(); // Refresh the recordings list
        }
    };

    /**
     * Stops the current recording session.
     */
    const stopRecording = async () => {
        const response = await fetch(`/sessions/stop`, {
            method: 'POST',
        });
        if (response.ok) {
            setIsRecording(false);
            fetchRecordings(); // Refresh the recordings list
        }
    };

    useEffect(() => {
        fetchRecordings(); // Fetch recordings on component mount
    }, []);

    return (
        <div className="recording-service">
            <h2>Recording Service</h2>
            <input
                type="text"
                placeholder="Enter session title"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
            />
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <h3>Recorded Sessions</h3>
            <ul>
                {recordings.map((session) => (
                    <li key={session.id}>{session.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecordingService;