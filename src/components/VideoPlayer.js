import React from 'react';

/**
 * VideoPlayer Component to showcase the video playback functionality.
 */
const VideoPlayer = ({ streamId }) => {
    return (
        <div>
            <h3>Video Player</h3>
            <p>Playing stream ID: {streamId}</p>
            {/* Video element placeholder */}
            <video controls>
                <source src={`path_to_video/${streamId}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;