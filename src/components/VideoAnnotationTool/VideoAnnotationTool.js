import React, { useState } from 'react';

function VideoAnnotationTool() {
    const [annotations, setAnnotations] = useState([]);

    const addAnnotation = (time, comment) => {
        setAnnotations([...annotations, { time, comment }]);
        // Submit annotation to the server
        fetch('/api/annotations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ time, comment })
        });
    };

    return (
        <div>
            <h2>Video Annotation Tool</h2>
            <button onClick={() => addAnnotation(currentTime, 'Your comment here')}>Annotate</button>
            <ul>
                {annotations.map((ann, index) => <li key={index}>{ann.time}: {ann.comment}</li>)}
            </ul>
        </div>
    );
}

export default VideoAnnotationTool;