import React, { useState, useRef } from 'react';

/**
 * VideoPlayerComponent allows users to play, pause, and seek uploaded videos.
 * It features responsive design and customizable controls.
 */
const VideoPlayerComponent = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (event) => {
        const seekPercentage = event.target.value;
        videoRef.current.currentTime = videoRef.current.duration * (seekPercentage / 100);
    };

    return (
        <div className="video-player-container">
            <video ref={videoRef} className="video-player" width="100%" controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="controls">
                <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <input type="range" min="0" max="100" onChange={handleSeek} />
            </div>
        </div>
    );
};

export default VideoPlayerComponent;