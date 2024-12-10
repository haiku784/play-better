import React from 'react';
import { RecordingButton } from './styles/RecordingButtonStyles';

const RecordingButtonComponent = ({ onClick, isRecording }) => {
  return (
    <RecordingButton onClick={onClick}>
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </RecordingButton>
  );
};

export default RecordingButtonComponent;
