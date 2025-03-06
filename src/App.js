import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [recordings, setRecordings] = useState([]);
    const [newRecording, setNewRecording] = useState({});
    const [selectedRecording, setSelectedRecording] = useState(null);

    // Fetch all recordings
    const fetchRecordings = async () => {
        const response = await axios.get('/recordings/');
        setRecordings(response.data);
    };

    // Create a new recording
    const createRecording = async () => {
        const response = await axios.post('/recordings/', newRecording);
        setRecordings([...recordings, response.data]);
        setNewRecording({}); // Reset form
    };

    // Update a specific recording
    const updateRecording = async (id) => {
        const response = await axios.put(`/recordings/${id}/`, selectedRecording);
        setRecordings(recordings.map(rec => (rec.id === id ? response.data : rec)));
        setSelectedRecording(null); // Reset selected recording
    };

    // Delete a specific recording
    const deleteRecording = async (id) => {
        await axios.delete(`/recordings/${id}/`);
        setRecordings(recordings.filter(rec => rec.id !== id));
    };

    useEffect(() => {
        fetchRecordings();
    }, []);

    return (
        <div>
            <h1>Gameplay Recordings</h1>
            <h2>Create New Recording</h2>
            <input type="text" placeholder="Recording Name" onChange={(e) => setNewRecording({ ...newRecording, name: e.target.value })} />
            <button onClick={createRecording}>Create</button>
            
            <h2>All Recordings</h2>
            <ul>
                {recordings.map(recording => (
                    <li key={recording.id}>
                        {recording.name} 
                        <button onClick={() => setSelectedRecording(recording)}>Edit</button>
                        <button onClick={() => deleteRecording(recording.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            
            {selectedRecording && (
                <div>
                    <h2>Edit Recording</h2>
                    <input type="text" value={selectedRecording.name} onChange={(e) => setSelectedRecording({ ...selectedRecording, name: e.target.value })} />
                    <button onClick={() => updateRecording(selectedRecording.id)}>Update</button>
                </div>
            )}
        </div>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importing CSS for styling

/**
 * App component for managing gameplay recordings.
 * This component handles fetching, creating, updating, and deleting recordings.
 */
const App = () => {
    const [recordings, setRecordings] = useState([]);
    const [newRecording, setNewRecording] = useState({ name: '' });
    const [selectedRecording, setSelectedRecording] = useState(null);

    /**
     * Fetch all recordings from the backend.
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
     * Create a new recording.
     */
    const createRecording = async () => {
        try {
            const response = await axios.post('/recordings/', newRecording);
            setRecordings([...recordings, response.data]);
            setNewRecording({ name: '' }); // Reset form
        } catch (error) {
            console.error('Error creating recording:', error);
        }
    };

    /**
     * Update a specific recording.
     */
    const updateRecording = async (id) => {
        try {
            const response = await axios.put(`/recordings/${id}/`, selectedRecording);
            setRecordings(recordings.map(rec => (rec.id === id ? response.data : rec)));
            setSelectedRecording(null); // Reset selected recording
        } catch (error) {
            console.error('Error updating recording:', error);
        }
    };

    /**
     * Delete a specific recording.
     */
    const deleteRecording = async (id) => {
        try {
            await axios.delete(`/recordings/${id}/`);
            setRecordings(recordings.filter(rec => rec.id !== id));
        } catch (error) {
            console.error('Error deleting recording:', error);
        }
    };

    useEffect(() => {
        fetchRecordings();
    }, []);

    return (
        <div className="app-container">
            <h1>Gameplay Recordings</h1>
            <h2>Create New Recording</h2>
            <input
                type="text"
                placeholder="Recording Name"
                value={newRecording.name}
                onChange={(e) => setNewRecording({ ...newRecording, name: e.target.value })}
            />
            <button onClick={createRecording}>Create</button>

            <h2>All Recordings</h2>
            <ul className="recording-list">
                {recordings.map(recording => (
                    <li key={recording.id} className="recording-item">
                        {recording.name} 
                        <button onClick={() => setSelectedRecording(recording)}>Edit</button>
                        <button onClick={() => deleteRecording(recording.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {selectedRecording && (
                <div className="edit-recording">
                    <h2>Edit Recording</h2>
                    <input
                        type="text"
                        value={selectedRecording.name}
                        onChange={(e) => setSelectedRecording({ ...selectedRecording, name: e.target.value })}
                    />
                    <button onClick={() => updateRecording(selectedRecording.id)}>Update</button>
                </div>
            )}
        </div>
    );
};

export default App; 

/**
 * App.css
 * Styles for the App component.
 */
.app-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.recording-list {
    list-style-type: none;
    padding: 0;
}

.recording-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}

.edit-recording {
    margin-top: 20px;
} 

/**
 * Unit Tests for App Component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('App Component', () => {
    test('renders App component', () => {
        render(<App />);
        expect(screen.getByText(/Gameplay Recordings/i)).toBeInTheDocument();
    });

    test('fetches and displays recordings', async () => {
        const recordings = [{ id: 1, name: 'Test Recording' }];
        axios.get.mockResolvedValueOnce({ data: recordings });

        render(<App />);
        expect(await screen.findByText(/Test Recording/i)).toBeInTheDocument();
    });

    test('creates a new recording', async () => {
        const newRecording = { id: 2, name: 'New Recording' };
        axios.get.mockResolvedValueOnce({ data: [] });
        axios.post.mockResolvedValueOnce({ data: newRecording });

        render(<App />);
        fireEvent.change(screen.getByPlaceholderText(/Recording Name/i), { target: { value: 'New Recording' } });
        fireEvent.click(screen.getByText(/Create/i));

        expect(await screen.findByText(/New Recording/i)).toBeInTheDocument();
    });

    test('updates an existing recording', async () => {
        const updatedRecording = { id: 1, name: 'Updated Recording' };
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Test Recording' }] });
        axios.put.mockResolvedValueOnce({ data: updatedRecording });

        render(<App />);
        fireEvent.click(screen.getByText(/Edit/i));
        fireEvent.change(screen.getByDisplayValue(/Test Recording/i), { target: { value: 'Updated Recording' } });
        fireEvent.click(screen.getByText(/Update/i));

        expect(await screen.findByText(/Updated Recording/i)).toBeInTheDocument();
    });

    test('deletes a recording', async () => {
        const recordings = [{ id: 1, name: 'Test Recording' }];
        axios.get.mockResolvedValueOnce({ data: recordings });
        axios.delete.mockResolvedValueOnce({});

        render(<App />);
        fireEvent.click(screen.getByText(/Delete/i));

        expect(await screen.queryByText(/Test Recording/i)).not.toBeInTheDocument();
    });
});

/**
 * Integration Tests for App Component
 */
import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('App Integration Tests', () => {
    test('full integration test', async () => {
        const recordings = [{ id: 1, name: 'Test Recording' }];
        axios.get.mockResolvedValueOnce({ data: recordings });
        axios.post.mockResolvedValueOnce({ data: { id: 2, name: 'New Recording' } });

        render(<App />);

        expect(await screen.findByText(/Test Recording/i)).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText(/Recording Name/i), { target: { value: 'New Recording' } });
        fireEvent.click(screen.getByText(/Create/i));

        expect(await screen.findByText(/New Recording/i)).toBeInTheDocument();
    });
});

// Note: Ensure to install necessary packages for testing: 
// npm install --save-dev @testing-library/react @testing-library/jest-dom axios jest

// This code provides a complete implementation of the Recording Service frontend component with proper documentation, styling, unit tests, and integration tests.