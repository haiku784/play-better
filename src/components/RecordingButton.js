import React from 'react';

// This component represents a button that allows users to start recording gameplay.
const RecordingButton = ({ startRecording }) => {
    return (
        <button 
            onClick={startRecording}
            style={styles.button} // inline styles for demo
            aria-label="Start Recording"
        >
            Start Recording
        </button>
    );
};

// Inline styles for the button component
const styles = {
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50', // green
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default RecordingButton;
