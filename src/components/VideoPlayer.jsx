import React from 'react';

const VideoPlayer = ({ streamId }) => {
    return (
        <video controls>
            <source src={`https://yourservice.com/stream/${streamId}`} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;