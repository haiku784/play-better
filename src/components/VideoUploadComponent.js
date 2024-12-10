import React, { useState } from 'react';

/**
 * A component that allows users to upload their gameplay videos.
 */
const VideoUploadComponent = () => {
    const [videoFile, setVideoFile] = useState(null);

    /**
     * Handles the file input change event.
     * @param {Event} event - The change event from the file input.
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(URL.createObjectURL(file)); // Create a URL for the selected video file
        }
    };

    /**
     * Renders the video player when a video is uploaded.
     */
    const renderVideoPlayer = () => {
        if (videoFile) {
            return (
                <video width="600" controls>
                    <source src={videoFile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }
        return <p>No video uploaded yet.</p>;
    };

    return (
        <div>
            <h1>Upload Your Gameplay Video</h1>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            {renderVideoPlayer()}
        </div>
    );
};

export default VideoUploadComponent;