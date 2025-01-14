import React from 'react';
import { useGameplayRecorder } from '../hooks/GameplayRecorder';

const RecordingButton: React.FC = () => {
    const { isRecording, startRecording, stopRecording } = useGameplayRecorder();

    return (
        <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
    );
};

export default RecordingButton;
