import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InsightsRetrievalComponent = ({ fetchInsights, displayInsights, onInsightsFetched, onInsightsFetchFailed }) => {
    const [userId, setUserId] = useState('');
    const [feedbackId, setFeedbackId] = useState('');
    const [insightsData, setInsightsData] = useState([]);
    const [followUpActions, setFollowUpActions] = useState([]);

    const handleFetchInsights = async () => {
        try {
            const data = await fetchInsights(userId, feedbackId);
            setInsightsData(data.insights);
            setFollowUpActions(data.followUpActions);
            onInsightsFetched(); // Callback on success
        } catch (error) {
            console.error('Failed to fetch insights:', error);
            onInsightsFetchFailed(); // Callback on failure
        }
    };

    return (
        <div className="insights-retrieval">
            <input 
                type="text" 
                placeholder="User ID" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                required
            />
            <input 
                type="text" 
                placeholder="Feedback ID" 
                value={feedbackId} 
                onChange={(e) => setFeedbackId(e.target.value)} 
                required
            />
            <button onClick={handleFetchInsights}>Fetch Insights</button>
            <div className="insights-display">
                <h3>Insights</h3>
                <ul>
                    {insightsData.map((insight, index) => (
                        <li key={index}>{insight}</li>
                    ))}
                </ul>
            </div>
            <div className="follow-up-actions-display">
                <h3>Follow-Up Actions</h3>
                <ul>
                    {followUpActions.map((action, index) => (
                        <li key={index}>{action}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

InsightsRetrievalComponent.propTypes = {
    fetchInsights: PropTypes.func.isRequired,
    displayInsights: PropTypes.func,
    onInsightsFetched: PropTypes.func,
    onInsightsFetchFailed: PropTypes.func,
};

export default InsightsRetrievalComponent;