import React from 'react';

const GameplayRecorder = () => {
    const startRecording = () => {
        // Start recording gameplay (API call)
        console.log('Recording started');
    };

    return (
        <div>
            <h1>Gameplay Recorder</h1>
            <button onClick={startRecording}>Start Recording</button>
        </div>
    );
};

export default GameplayRecorder;