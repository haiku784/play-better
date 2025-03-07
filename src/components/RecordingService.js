import React, { useState, useEffect } from 'react';
import './RecordingService.css';

/**
 * RecordingService component handles the recording functionalities
 * including starting, stopping, and deleting recordings.
 */
const RecordingService = () => {
  const [sessionId, setSessionId] = useState(null);
  const [recordings, setRecordings] = useState([]);

  /**
   * Starts a new recording session.
   */
  const startRecording = async () => {
    try {
      const response = await fetch('/recording/start', { method: 'POST' });
      const data = await response.json();
      setSessionId(data.session_id);
      fetchRecordings(); // Refresh recordings after starting a new one
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  /**
   * Stops the current recording session.
   */
  const stopRecording = async () => {
    if (!sessionId) return;
    try {
      await fetch(`/recording/${sessionId}`, { method: 'DELETE' });
      setSessionId(null);
      fetchRecordings(); // Refresh recordings after stopping
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  /**
   * Fetches all recordings from the server.
   */
  const fetchRecordings = async () => {
    try {
      const response = await fetch('/recording/');
      const data = await response.json();
      setRecordings(data);
    } catch (error) {
      console.error('Error fetching recordings:', error);
    }
  };

  /**
   * Deletes a specific recording by session ID.
   * @param {string} id - The ID of the recording to delete.
   */
  const deleteRecording = async (id) => {
    try {
      await fetch(`/recording/${id}`, { method: 'DELETE' });
      fetchRecordings(); // Refresh recordings after deletion
    } catch (error) {
      console.error('Error deleting recording:', error);
    }
  };

  useEffect(() => {
    fetchRecordings(); // Fetch recordings on component mount
  }, []);

  return (
    <div className="recording-service">
      <h2>Recording Service</h2>
      <button onClick={startRecording} className="start-button">Start Recording</button>
      <button onClick={stopRecording} className="stop-button" disabled={!sessionId}>Stop Recording</button>
      <h3>Recordings</h3>
      <ul className="recording-list">
        {recordings.map(recording => (
          <li key={recording.sessionId} className="recording-item">
            <span>{recording.gameTitle} - {recording.duration} seconds</span>
            <button onClick={() => deleteRecording(recording.sessionId)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordingService;