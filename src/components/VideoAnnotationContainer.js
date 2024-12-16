import React from 'react';
import './VideoAnnotation.css';

const VideoAnnotationContainer = () => {
    return (
        <div className="video-annotation-container">
            {/* Video Player Component */}
            <div className="video-player">
                <video controls>
                    <source src="video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {/* Annotations Section */}
            <div className="annotations">
                <h2>Annotations</h2>
                {/* Placeholder for annotation items */}
                <ul className="annotation-list">
                    <li>Annotation 1</li>
                    <li>Annotation 2</li>
                </ul>
            </div>
        </div>
    );
};

export default VideoAnnotationContainer;