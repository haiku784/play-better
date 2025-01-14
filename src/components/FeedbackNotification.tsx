import React from 'react';

interface FeedbackNotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const FeedbackNotification: React.FC<FeedbackNotificationProps> = ({ message, type, onClose }) => {
    return (
        <div className={`notification ${type}`}> {/* class could be used for styling */}
            <span>{message}</span>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default FeedbackNotification;