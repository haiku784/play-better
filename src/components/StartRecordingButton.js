import React from 'react';
import './StartRecordingButton.css'; // Importing CSS file for styles

const StartRecordingButton = ({ onStart }) => {
    return (
        <button className="start-recording-button" onClick={onStart}>
            Start Recording
        </button>
    );
};

export default StartRecordingButton;
