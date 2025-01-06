import React from 'react';
import './StopRecordingButton.css'; // Importing CSS file for styles

const StopRecordingButton = ({ onStop }) => {
    return (
        <button className="stop-recording-button" onClick={onStop}>
            Stop Recording
        </button>
    );
};

export default StopRecordingButton;
