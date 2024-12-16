import React, { useState } from 'react';

// TabbedInterface is a component that renders a tabbed interface allowing users to switch between views.
const TabbedInterface = () => {
    // useState to manage the active tab
    const [activeTab, setActiveTab] = useState('tab1');

    // Tab content for each tab
    const tabContent = {
        tab1: <div>Content for Tab 1</div>,
        tab2: <div>Content for Tab 2</div>,
        tab3: <div>Content for Tab 3</div>,
    };

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tabbed-interface">
            <div className="tabs">
                {/* Render tab buttons */}
                {Object.keys(tabContent).map(tab => (
                    <button 
                        key={tab} 
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`} 
                        onClick={() => handleTabChange(tab)}
                    >
                        {`Tab ${tab.charAt(tab.length - 1)}`}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {/* Render active tab content */}
                {tabContent[activeTab]}
            </div>
        </div>
    );
};

export default TabbedInterface;