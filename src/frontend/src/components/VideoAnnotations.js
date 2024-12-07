import React, { useState } from 'react';

const VideoAnnotations = () => {
    const [annotations, setAnnotations] = useState([]);

    const addAnnotation = (time, comment) => {
        setAnnotations([...annotations, { time, comment }]);
    };

    return (
        <div>
            <h1>Video Annotations</h1>
            <button onClick={() => addAnnotation(30, 'Great move!')}>Add Annotation</button>
            <ul>
                {annotations.map((ann, index) => (
                    <li key={index}>{`[${ann.time}s] ${ann.comment}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default VideoAnnotations;