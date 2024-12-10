import React, { useState, useEffect } from 'react';

const RecordingComponent = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [timer, setTimer] = useState(0);

    // Effect to handle timer while recording
    useEffect(() => {
        let interval = null;
        if (isRecording) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        } else if (!isRecording && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRecording, timer]);

    // Function to start recording
    const startRecording = () => {
        setIsRecording(true);
        setTimer(0); // Reset timer on new recording
        // Add any additional logic for starting recording here
    };

    // Function to stop recording
    const stopRecording = () => {
        setIsRecording(false);
        // Add any additional logic for stopping recording here
    };

    return (
        <div>
            <h1>{isRecording ? 'Recording...' : 'Press Start to Record'}</h1>
            <p>Timer: {timer} seconds</p>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
};

export default RecordingComponent;