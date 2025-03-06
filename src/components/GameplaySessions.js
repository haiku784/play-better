import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameplaySessions = () => {
    const [sessions, setSessions] = useState([]);
    const [session, setSession] = useState({});
    const [sessionId, setSessionId] = useState('');
    const [newSession, setNewSession] = useState({});

    // Fetch all gameplay sessions
    const fetchSessions = async () => {
        try {
            const response = await axios.get('/gameplay_sessions/');
            setSessions(response.data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Fetch a single gameplay session by ID
    const fetchSessionById = async (id) => {
        try {
            const response = await axios.get(`/gameplay_sessions/${id}/`);
            setSession(response.data);
        } catch (error) {
            console.error('Error fetching session:', error);
        }
    };

    // Create a new gameplay session
    const createSession = async () => {
        try {
            const response = await axios.post('/gameplay_sessions/', newSession);
            console.log('Session created:', response.data);
            fetchSessions(); // Refresh the list
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    // Update a gameplay session by ID
    const updateSession = async (id) => {
        try {
            const response = await axios.patch(`/gameplay_sessions/${id}/`, session);
            console.log('Session updated:', response.data);
            fetchSessions(); // Refresh the list
        } catch (error) {
            console.error('Error updating session:', error);
        }
    };

    // Delete a gameplay session by ID
    const deleteSession = async (id) => {
        try {
            await axios.delete(`/gameplay_sessions/${id}/`);
            console.log('Session deleted');
            fetchSessions(); // Refresh the list
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    useEffect(() => {
        fetchSessions(); // Fetch sessions on component mount
    }, []);

    return (
        <div>
            <h1>Gameplay Sessions</h1>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                        {session.name} 
                        <button onClick={() => fetchSessionById(session.id)}>View</button>
                        <button onClick={() => updateSession(session.id)}>Update</button>
                        <button onClick={() => deleteSession(session.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Create New Session</h2>
            <input type="text" placeholder="Session Name" onChange={(e) => setNewSession({ ...newSession, name: e.target.value })} />
            <button onClick={createSession}>Create Session</button>
        </div>
    );
};

export default GameplaySessions;