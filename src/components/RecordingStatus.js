import React, { useState } from 'react';

const RecordingStatus = () => {
    // State to manage recording status
    const [isRecording, setIsRecording] = useState(false);

    // Function to start recording
    const startRecording = () => {
        setIsRecording(true);
    };

    // Function to stop recording
    const stopRecording = () => {
        setIsRecording(false);
    };

    return (
        <div>
            <h1>{isRecording ? 'Recording...' : 'Stopped'}</h1>
            <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
        </div>
    );
};

export default RecordingStatus;