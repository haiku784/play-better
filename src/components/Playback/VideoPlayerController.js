import React from 'react';

const VideoPlayerController = ({ isPlaying, togglePlayback }) => {
    return (
        <div className="video-controller">
            <button onClick={togglePlayback}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default VideoPlayerController;