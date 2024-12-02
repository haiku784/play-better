import React, { useState } from 'react';

const VideoAnnotation = () => {
    const [annotations, setAnnotations] = useState([]);

    const handleAddAnnotation = (timestamp, comment) => {
        const newAnnotation = { timestamp, comment };
        setAnnotations([...annotations, newAnnotation]);
        // Submit annotation to the server via API
    };

    return (
        <div>
            <h1>Video Annotation</h1>
            <div className='annotations'>
                {annotations.map((a, index) => (
                    <div key={index}>
                        <span>{a.timestamp}</span>: {a.comment}
                    </div>
                ))}
            </div>
            <button onClick={() => handleAddAnnotation(30, 'Great move!')}>Annotate 30s</button>
            {/* Add more UI elements for user input and interaction */}
        </div>
    );
};

export default VideoAnnotation;