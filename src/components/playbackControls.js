import React from 'react';

// A simple component to manage playback controls
const PlaybackControls = ({ onStart, onStop }) => {
    return (
        <div className="playback-controls">
            <button onClick={onStart}>Start Playback</button>
            <button onClick={onStop}>Stop Playback</button>
        </div>
    );
};

export default PlaybackControls;