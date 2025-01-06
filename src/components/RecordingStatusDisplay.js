import React from 'react';

const RecordingStatusDisplay = ({ isRecording }) => {
    return (
        <div>
            <h2>Recording Status</h2>
            {/* Display recording status based on isRecording prop */}
            <p>{isRecording ? 'Recording in progress...' : 'Recording stopped.'}</p>
        </div>
    );
};

export default RecordingStatusDisplay;
