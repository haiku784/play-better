import React, { useState } from 'react';

const VideoAnnotations = () => {
    const [annotations, setAnnotations] = useState([]);

    const addAnnotation = (time, comment) => {
        setAnnotations([...annotations, {time, comment}]);
    };

    return (
        <div>
            <h2>Video Annotations</h2>
            <ul>
                {annotations.map((annotation, index) => (
                    <li key={index}>{`${annotation.time}: ${annotation.comment}`}</li>
                ))}
            </ul>
            {/* Placeholder for button to add annotation */}
        </div>
    );
};

export default VideoAnnotations;