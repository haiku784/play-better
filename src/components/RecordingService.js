import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecordingService.css'; // Importing CSS for styling

/**
 * RecordingService component allows users to manage gameplay recordings.
 * It provides functionality to start, stop, and view recordings.
 */
const RecordingService = () => {
    const [recordings, setRecordings] = useState([]); // State to hold recordings
    const [isRecording, setIsRecording] = useState(false); // State to track recording status
    const [recordingName, setRecordingName] = useState(''); // State to hold new recording name

    /**
     * Fetch all recordings from the backend service.
     */
    const fetchRecordings = async () => {
        try {
            const response = await axios.get('/recordings/');
            setRecordings(response.data);
        } catch (error) {
            console.error('Error fetching recordings:', error);
        }
    };

    /**
     * Start a new recording.
     */
    const startRecording = async () => {
        try {
            const response = await axios.post('/recordings/', { name: recordingName });
            console.log('Recording started:', response.data);
            setIsRecording(true);
            fetchRecordings(); // Refresh the list of recordings
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    /**
     * Stop the current recording.
     */
    const stopRecording = async () => {
        try {
            await axios.patch('/recordings/stop');
            console.log('Recording stopped');
            setIsRecording(false);
            fetchRecordings(); // Refresh the list of recordings
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    useEffect(() => {
        fetchRecordings(); // Fetch recordings on component mount
    }, []);

    return (
        <div className="recording-service">
            <h1>Recording Service</h1>
            <div className="recording-controls">
                <input
                    type="text"
                    placeholder="Enter Recording Name"
                    value={recordingName}
                    onChange={(e) => setRecordingName(e.target.value)}
                />
                <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
                <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
            </div>
            <h2>Recordings List</h2>
            <ul className="recordings-list">
                {recordings.map((recording) => (
                    <li key={recording.id}>
                        {recording.name} - {recording.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecordingService; // Exporting the component for use in other parts of the application

/**
 * CSS for RecordingService component
 */
/* RecordingService.css */
.recording-service {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.recording-controls {
    margin-bottom: 20px;
}
.recording-controls input {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.recording-controls button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}
.recording-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
.recordings-list {
    list-style-type: none;
    padding: 0;
}
.recordings-list li {
    padding: 10px;
    border-bottom: 1px solid #eee;
} 

/**
 * Unit Tests for RecordingService component
 */
// RecordingService.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';
import axios from 'axios';

jest.mock('axios'); // Mocking axios for API calls

describe('RecordingService Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Test Recording', status: 'stopped' }] });
    });

    test('renders RecordingService component', () => {
        render(<RecordingService />);
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('fetches and displays recordings', async () => {
        render(<RecordingService />);
        const recordingItem = await screen.findByText(/Test Recording/i);
        expect(recordingItem).toBeInTheDocument();
    });

    test('starts a recording', async () => {
        render(<RecordingService />);
        const input = screen.getByPlaceholderText(/Enter Recording Name/i);
        const startButton = screen.getByText(/Start Recording/i);

        fireEvent.change(input, { target: { value: 'New Recording' } });
        axios.post.mockResolvedValue({ data: { id: 2, name: 'New Recording', status: 'recording' } });
        fireEvent.click(startButton);

        const newRecordingItem = await screen.findByText(/New Recording/i);
        expect(newRecordingItem).toBeInTheDocument();
    });

    test('stops a recording', async () => {
        render(<RecordingService />);
        const stopButton = screen.getByText(/Stop Recording/i);
        axios.patch.mockResolvedValue({});
        fireEvent.click(stopButton);
        expect(stopButton).toBeDisabled();
    });
});

/**
 * Integration Tests for RecordingService component
 */
// RecordingService.integration.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordingService from './RecordingService';
import axios from 'axios';

jest.mock('axios');

describe('RecordingService Integration Tests', () => {
    test('fetches and displays recordings on mount', async () => {
        axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Integration Test Recording', status: 'stopped' }] });
        render(<RecordingService />);
        const recordingItem = await screen.findByText(/Integration Test Recording/i);
        expect(recordingItem).toBeInTheDocument();
    });
});

// Note: Ensure to run tests using a testing framework like Jest.