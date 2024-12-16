import React, { useState, useEffect } from 'react';

const CommentStorage = () => {
    // State to hold the comments
    const [comments, setComments] = useState([]);

    // Effect to load comments from local storage on component mount
    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        setComments(storedComments);
    }, []);

    // Function to add a new comment
    const addComment = (newComment) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments)); // Save to local storage
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
        if (comment) {
            addComment(comment);
            event.target.reset(); // Clear the input field
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="comment" placeholder="Add a comment" required />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentStorage;
