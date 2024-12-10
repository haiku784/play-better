import React, { useState } from 'react';

const VideoPlayer = () => {
    // Local state to keep track of highlights and comments
    const [highlights, setHighlights] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState('');

    const handleHighlight = (time) => {
        // Add a highlight at the current time
        setHighlights([...highlights, time]);
    };

    const handleCommentChange = (event) => {
        // Update current comment from input
        setCurrentComment(event.target.value);
    };

    const handleAddComment = () => {
        // Add the current comment to state
        if (currentComment) {
            setComments([...comments, currentComment]);
            setCurrentComment(''); // Reset input
        }
    };

    return (
        <div>
            <video src="your-video-url.mp4" controls onTimeUpdate={(e) => handleHighlight(e.target.currentTime)} />
            <div>
                <input 
                    type="text" 
                    value={currentComment} 
                    onChange={handleCommentChange} 
                    placeholder="Add a comment" 
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            <div>
                <h3>Highlights</h3>
                <ul>
                    {highlights.map((highlight, index) => (
                        <li key={index}>Highlight at {highlight.toFixed(2)} seconds</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoPlayer;