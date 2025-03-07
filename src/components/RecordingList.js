// src/components/RecordingList.js
import React, { useEffect, useState } from 'react';
import './RecordingList.css';

/**
 * RecordingList component fetches and displays a list of recordings.
 * It communicates with the Gateway Service to retrieve recording data.
 */
const RecordingList = () => {
  const [recordings, setRecordings] = useState([]);

  /**
   * Fetch recordings from the Gateway Service.
   */
  const fetchRecordings = async () => {
    try {
      const response = await fetch('/recordings/');
      if (!response.ok) throw new Error('Failed to fetch recordings');
      const data = await response.json();
      setRecordings(data);
    } catch (error) {
      console.error('Error fetching recordings:', error);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  return (
    <div className="recording-list">
      <h2>Recordings</h2>
      {recordings.length > 0 ? (
        <ul>
          {recordings.map((recording) => (
            <li key={recording.id}>{recording.title}</li>
          ))}
        </ul>
      ) : (
        <p>No recordings available.</p>
      )}
    </div>
  );
};

export default RecordingList;
