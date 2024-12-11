import React from 'react';
import VideoComments from './components/VideoComments';

// Main App component that renders the VideoComments component
const App = () => {
    return (
        <div>
            <h1>Video Player</h1>
            {/* Video player component can be added here */}
            <VideoComments />
        </div>
    );
};

export default App;