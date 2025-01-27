import React, { useState } from 'react';

const FeedbackAcknowledgmentComponent = () => {
    // Define state for acknowledgment status and response message
    const [acknowledgmentStatus, setAcknowledgmentStatus] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [feedbackId, setFeedbackId] = useState('');
    const [message, setMessage] = useState('');

    // Function to send acknowledgment
    const sendAcknowledgment = async () => {
        const input = { userId, feedbackId, message };
        try {
            const response = await fetch('/api/sendAcknowledgment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });
            const result = await response.json();
            // Update the acknowledgment status and response message
            setAcknowledgmentStatus(result.status);
            setResponseMessage(result.message);
            if (result.status === 'success') {
                onAcknowledgmentSent();
            } else {
                onAcknowledgmentFailed();
            }
        } catch (error) {
            console.error('Error sending acknowledgment:', error);
            setAcknowledgmentStatus('failed');
            setResponseMessage('An error occurred while sending acknowledgment.');
            onAcknowledgmentFailed();
        }
    };

    const onAcknowledgmentSent = () => {
        console.log('Acknowledgment sent successfully!');
    };

    const onAcknowledgmentFailed = () => {
        console.log('Acknowledgment failed.');
    };

    return (
        <div>
            <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
            <input type="text" placeholder="Feedback ID" value={feedbackId} onChange={e => setFeedbackId(e.target.value)} />
            <input type="text" placeholder="Optional message" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendAcknowledgment} style={{ backgroundColor: 'blue', color: 'white' }}>Submit</button>
            <div style={{ color: acknowledgmentStatus === 'success' ? 'green' : 'red' }}>{responseMessage}</div>
        </div>
    );
};

export default FeedbackAcknowledgmentComponent;