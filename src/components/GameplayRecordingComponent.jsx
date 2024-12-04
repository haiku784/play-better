import React, { useState } from 'react';
import GameplayRecorder from './GameplayRecorder';

const GameplayRecordingComponent = () => {
  const [recorder] = useState(new GameplayRecorder());

  const handleStart = () => {
    recorder.startRecording();
  };

  const handleStop = () => {
    recorder.stopRecording();
    recorder.saveData();
  };

  return (
    <div>
      <button onClick={handleStart}>Start Recording</button>
      <button onClick={handleStop}>Stop Recording</button>
    </div>
  );
};

export default GameplayRecordingComponent;