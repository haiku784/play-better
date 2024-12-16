import React, { useState } from 'react';
import CommentModal from './CommentModal';

// HighlightMoment is a component that simulates a highlighted moment and opens a comment modal on click.
const HighlightMoment = () => {
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Handles opening the modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Handles closing the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Handles the submission of the comment from the modal
    const handleCommentSubmit = (comment) => {
        console.log('Comment submitted:', comment); // Log the comment (could also update state or make API call)
    };

    return (
        <div>
            <div className="highlight" onClick={openModal}>
                Highlighted Moment
            </div>
            <CommentModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onSubmit={handleCommentSubmit} 
            />
        </div>
    );
};

export default HighlightMoment;