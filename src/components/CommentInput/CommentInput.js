import React, { useState } from 'react';

// CommentInput component allows users to input comments for highlights
const CommentInput = ({ onAddComment }) => {
    const [comment, setComment] = useState('');

    // Handle input change
    const handleChange = (event) => {
        setComment(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (comment.trim()) { // Check if the comment is not empty
            onAddComment(comment); // Add the comment
            setComment(''); // Clear the input field
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={comment}
                onChange={handleChange}
                placeholder="Add a comment..."
                required
            />
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default CommentInput;