import React, { useEffect, useState } from 'react';
import './RecordingService.css'; // Importing CSS for styling

/**
 * RecordingService component handles the recording sessions for the user.
 * It allows users to start, stop, save, and delete gameplay recordings.
 */
const RecordingService = () => {
  const [sessions, setSessions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  /**
   * Fetches all gameplay sessions from the API.
   */
  const fetchGameplaySessions = async () => {
    const response = await fetch('/gameplay_sessions/');
    const data = await response.json();
    setSessions(data);
  };

  /**
   * Starts a new gameplay recording session.
   */
  const startRecording = async () => {
    const response = await fetch('/gameplay_sessions/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameTitle: 'New Game', recordingData: {} }),
    });
    const session = await response.json();
    setCurrentSession(session);
    setIsRecording(true);
  };

  /**
   * Stops the current gameplay recording session.
   */
  const stopRecording = async () => {
    if (!currentSession) return;
    await fetch(`/gameplay_sessions/${currentSession.sessionId}/stop`, {
      method: 'POST',
    });
    setIsRecording(false);
    setCurrentSession(null);
    fetchGameplaySessions(); // Refresh the session list
  };

  /**
   * Deletes a gameplay session by ID.
   * @param {string} sessionId - The ID of the session to delete.
   */
  const deleteSession = async (sessionId) => {
    await fetch(`/gameplay_sessions/${sessionId}/`, { method: 'DELETE' });
    fetchGameplaySessions(); // Refresh the session list
  };

  useEffect(() => {
    fetchGameplaySessions();
  }, []);

  return (
    <div className="recording-service">
      <h2>Gameplay Recording Service</h2>
      <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
      <h3>Recorded Sessions</h3>
      <ul>
        {sessions.map(session => (
          <li key={session.sessionId}>
            {session.gameTitle} - {session.recordingData}
            <button onClick={() => deleteSession(session.sessionId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordingService;