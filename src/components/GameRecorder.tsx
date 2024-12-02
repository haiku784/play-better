import React, { useState } from 'react';

const GameRecorder: React.FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const startRecording = () => {
        // Logic to start recording gameplay
        setIsRecording(true);
    };

    const stopRecording = () => {
        // Logic to stop recording gameplay
        setIsRecording(false);
    };

    return (
        <div>
            <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
        </div>
    );
};

export default GameRecorder;