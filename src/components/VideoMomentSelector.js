import React, { useState } from 'react';

// VideoMomentSelector component allows users to select moments in a video
const VideoMomentSelector = () => {
    const [moments, setMoments] = useState([]); // State to store highlighted moments
    const [isSelecting, setIsSelecting] = useState(false); // State to control selection mode

    // Function to handle click event on the video
    const handleVideoClick = (event) => {
        if (isSelecting) {
            const videoElement = event.target;
            const videoTime = videoElement.currentTime; // Get the current time of the video
            // Add the selected moment to the list
            setMoments([...moments, videoTime]);
        }
    };

    // Function to toggle selection mode
    const toggleSelection = () => {
        setIsSelecting(!isSelecting);
    };

    return (
        <div>
            <button onClick={toggleSelection}>{isSelecting ? 'Stop Selecting' : 'Select Moment'}</button>
            <video
                width="600"
                controls
                onClick={handleVideoClick}
                style={{ cursor: isSelecting ? 'crosshair' : 'pointer' }}
            >
                <source src="path/to/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h3>Highlighted Moments:</h3>
            <ul>
                {moments.map((moment, index) => (
                    <li key={index}>Moment at {moment.toFixed(2)} seconds</li>
                ))}
            </ul>
        </div>
    );
};

export default VideoMomentSelector;