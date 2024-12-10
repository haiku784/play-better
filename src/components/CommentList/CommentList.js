import React from 'react';

// CommentList component to display list of comments
const CommentList = ({ comments }) => {
    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;