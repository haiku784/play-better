import React, { useState } from 'react';

// CommentModal is a component that displays a modal for adding comments to a highlighted moment.
const CommentModal = ({ isOpen, onClose, onSubmit }) => {
    const [comment, setComment] = useState(''); // State to hold the comment input

    // Handles the change in the comment input field
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    // Handles the submission of the comment
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission
        onSubmit(comment); // Calls the onSubmit function passed as prop
        setComment(''); // Resets the comment input
        onClose(); // Closes the modal
    };

    // Renders the modal if isOpen is true
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add a Comment</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={comment}
                        onChange={handleChange}
                        placeholder="Type your comment here..."
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CommentModal;