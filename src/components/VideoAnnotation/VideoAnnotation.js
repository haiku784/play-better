import React, { useState } from 'react';

// VideoAnnotation: Component for adding timestamped comments and highlights
const VideoAnnotation = () => {
    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState('');
    const [currentTime, setCurrentTime] = useState(0);

    // Handler for adding comment
    const addComment = () => {
        if (currentComment.trim() !== '') {
            setComments([...comments, { time: currentTime, text: currentComment }]);
            setCurrentComment('');
        }
    };

    // Simulated function to capture current video time
    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    return (
        <div>
            <video onTimeUpdate={(e) => handleTimeUpdate(e.target.currentTime)} controls>
                <source src='your-video-file.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div>
                <input
                    type='text'
                    value={currentComment}
                    onChange={(e) => setCurrentComment(e.target.value)}
                    placeholder='Add a comment...'
                />
                <button onClick={addComment}>Add Comment</button>
            </div>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>[{comment.time.toFixed(2)}s] {comment.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default VideoAnnotation;