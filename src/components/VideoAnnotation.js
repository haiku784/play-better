import React, { useState } from 'react';

const VideoAnnotation = ({ videoSrc }) => {
  const [annotations, setAnnotations] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const handleAddAnnotation = () => {
    const newAnnotation = prompt('Enter annotation:');
    if (newAnnotation) {
      setAnnotations([...annotations, { time: currentTime, text: newAnnotation }]);
    }
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  return (
    <div>
      <video src={videoSrc} onTimeUpdate={handleTimeUpdate} controls></video>
      <button onClick={handleAddAnnotation}>Add Annotation</button>
      <div>
        <h3>Annotations:</h3>
        <ul>
          {annotations.map((annotation, index) => (
            <li key={index}>{annotation.time.toFixed(2)}s - {annotation.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoAnnotation;