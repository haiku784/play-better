import React, { useState } from 'react';

// This component manages comments associated with highlighted moments in a video.
const CommentSection = () => {
    // State to hold comments for each moment
    const [comments, setComments] = useState({});
    const [currentMoment, setCurrentMoment] = useState('');
    const [commentText, setCommentText] = useState('');

    // Function to handle adding a comment
    const addComment = () => {
        if (currentMoment && commentText) {
            // Update state by adding the new comment to the specific moment
            setComments(prevComments => ({
                ...prevComments,
                [currentMoment]: [...(prevComments[currentMoment] || []), commentText]
            }));
            // Clear the comment input
            setCommentText('');
        }
    };

    // Function to handle moment selection
    const handleMomentChange = (moment) => {
        setCurrentMoment(moment);
    };

    return (
        <div>
            <h2>Comments for Highlighted Moments</h2>
            {/* Input for selecting moment */}
            <select onChange={(e) => handleMomentChange(e.target.value)}>
                <option value="">Select a moment</option>
                <option value="moment1">Moment 1</option>
                <option value="moment2">Moment 2</option>
                {/* Add more moments as needed */}
            </select>
            {/* Input for adding a comment */}
            <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
            />
            <button onClick={addComment}>Submit Comment</button>

            {/* Display comments for the selected moment */}
            <div>
                <h3>Comments:</h3>
                <ul>
                    {(comments[currentMoment] || []).map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommentSection;