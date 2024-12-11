import React, { useState } from 'react';

/**
 * VideoHighlightAdder component allows users to click on the video timeline to add highlights.
 * It visually marks the highlights on the video player.
 */
const VideoHighlightAdder = () => {
    const [highlights, setHighlights] = useState([]);
    const videoRef = React.createRef();

    /**
     * Function to handle click events on the video timeline.
     * It calculates the clicked time and adds it to the highlights.
     * @param {MouseEvent} e - The mouse event from the click.
     */
    const handleClick = (e) => {
        const video = videoRef.current;
        const boundingRect = video.getBoundingClientRect();
        const clickPosition = e.clientX - boundingRect.left;
        const totalWidth = boundingRect.width;
        const videoDuration = video.duration;

        // Calculate the time based on click position relative to video width
        const clickedTime = (clickPosition / totalWidth) * videoDuration;

        // Add the highlight time to the state
        setHighlights([...highlights, clickedTime]);
    };

    return (
        <div>
            <video ref={videoRef} onClick={handleClick} controls>
                <source src="your-video-source.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="highlights">
                {highlights.map((time, index) => (
                    <div key={index} className="highlight" style={{ left: `${(time / videoRef.current.duration) * 100}%` }}>
                        Highlight at {time.toFixed(2)} seconds
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoHighlightAdder;