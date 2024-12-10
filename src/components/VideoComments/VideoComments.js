import React, { useState } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

// VideoComments component integrates CommentInput and CommentList
const VideoComments = () => {
    const [comments, setComments] = useState([]);

    // Function to add a new comment
    const addComment = (newComment) => {
        setComments([...comments, newComment]);
    };

    return (
        <div>
            <CommentInput onAddComment={addComment} />
            <CommentList comments={comments} />
        </div>
    );
};

export default VideoComments;