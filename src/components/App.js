import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [isRecording, setIsRecording] = useState(false);

    const handleStartStopRecording = () => {
        setIsRecording(!isRecording);
    };

    return (
        <div className='container'>
            <h1>E-Sport Play Recorder</h1>
            <button onClick={handleStartStopRecording} className='record-btn'>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {/* Display recording status */}
            <p>{isRecording ? 'Recording...' : 'Not Recording'}</p>
        </div>
    );
};

export default App;