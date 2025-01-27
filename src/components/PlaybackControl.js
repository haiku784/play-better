import React from 'react';

/**
 * PlaybackControl Component to manage video playback controls.
 */
const PlaybackControl = ({ onPlay, onPause }) => {
    return (
        <div>
            <button onClick={onPlay}>Play</button>
            <button onClick={onPause}>Pause</button>
        </div>
    );
};

export default PlaybackControl;