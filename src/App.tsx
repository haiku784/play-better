import React from 'react';
import FeedbackMechanism from './components/FeedbackMechanism';

const App: React.FC = () => {
    return (
        <div className="app">
            <h1>User Feedback</h1>
            <FeedbackMechanism />
        </div>
    );
};

export default App;