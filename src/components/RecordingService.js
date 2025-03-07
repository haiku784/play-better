// src/components/RecordingService.js
import React, { useEffect, useState } from 'react';
import './RecordingService.css';

/**
 * RecordingService component handles the recording functionalities.
 * It allows users to start and stop recordings and displays the list of recordings.
 */
const RecordingService = () => {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  /**
   * Fetches the list of recordings from the API.
   */
  const fetchRecordings = async () => {
    try {
      const response = await fetch('/recordings/');
      const data = await response.json();
      setRecordings(data);
    } catch (error) {
      console.error('Error fetching recordings:', error);
    }
  };

  /**
   * Starts a new recording.
   */
  const startRecording = async () => {
    setIsRecording(true);
    // Call the API to start recording
    try {
      await fetch('/recordings/start', { method: 'POST' });
      fetchRecordings(); // Refresh the recordings list
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  /**
   * Stops the current recording.
   */
  const stopRecording = async () => {
    setIsRecording(false);
    // Call the API to stop recording
    try {
      await fetch('/recordings/stop', { method: 'POST' });
      fetchRecordings(); // Refresh the recordings list
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  return (
    <div className="recording-service">
      <h2>Recording Service</h2>
      <div className="controls">
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      <h3>Recordings List</h3>
      <ul className="recordings-list">
        {recordings.map((recording) => (
          <li key={recording.id}>{recording.title} - {recording.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecordingService;