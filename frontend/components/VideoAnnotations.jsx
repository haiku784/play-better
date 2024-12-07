import React, { useState } from 'react';
const VideoAnnotations = () => {
    const [annotations, setAnnotations] = useState([]);
    const handleAddAnnotation = (time) => {
        // Logic to add annotation
        setAnnotations([...annotations, { time, comment: '' }]);
    };

    return (
        <div>
            <h2>Video Annotations</h2>
            <button onClick={() => handleAddAnnotation(10)}>Add Annotation at 10s</button>
            <ul>{annotations.map((anno, index) => <li key={index}>{anno.time}s - {anno.comment}</li>)}</ul>
        </div>
    );
};

export default VideoAnnotations;