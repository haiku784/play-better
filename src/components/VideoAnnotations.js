import React, { useState } from 'react';

const VideoAnnotations = ({ videoId }) => {
    const [annotations, setAnnotations] = useState([]);

    const addAnnotation = (time, comment) => {
        setAnnotations([...annotations, { time, comment }]);
    };

    return (
        <div>
            <h3>Video Annotations</h3>
            <video src={videoId} controls onClick={() => addAnnotation(10, 'Example Comment')} />
            <ul>
                {annotations.map((a, index) => <li key={index}>{a.time}s: {a.comment}</li>)}
            </ul>
        </div>
    );
};

export default VideoAnnotations;