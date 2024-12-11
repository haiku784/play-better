import React, { useEffect, useState } from 'react';

// The Sidebar component that displays highlights and comments for the uploaded video.
const Sidebar = ({ videoId }) => {
    const [highlights, setHighlights] = useState([]);
    const [comments, setComments] = useState([]);

    // Function to fetch highlights and comments from the server
    const fetchHighlightsAndComments = async () => {
        try {
            const highlightsResponse = await fetch(`/api/videos/${videoId}/highlights`);
            const commentsResponse = await fetch(`/api/videos/${videoId}/comments`);
            const highlightsData = await highlightsResponse.json();
            const commentsData = await commentsResponse.json();
            setHighlights(highlightsData);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching highlights and comments:', error);
        }
    };

    // Fetch highlights and comments whenever the videoId changes
    useEffect(() => {
        fetchHighlightsAndComments();
    }, [videoId]);

    return (
        <div className="sidebar">
            <h2>Highlights</h2>
            <ul>
                {highlights.map((highlight, index) => (
                    <li key={index}>{highlight.text}</li>
                ))}
            </ul>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;