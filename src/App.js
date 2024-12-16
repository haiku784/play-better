import React from 'react';
import TabbedInterface from './components/tabs/TabbedInterface';
import './components/tabs/TabbedInterface.css';

// Main App component rendering the TabbedInterface
const App = () => {
    return (
        <div className="App">
            <h1>My Tabbed Interface</h1>
            <TabbedInterface />
        </div>
    );
};

export default App;