import React, { useState } from 'react';

const CollapsibleSidebar = () => {
    // State to manage the visibility of the sidebar
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the sidebar open/close
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Button to toggle the sidebar */}
            <button onClick={toggleSidebar}>
                {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>

            {/* Sidebar container */}
            <div style={{
                width: isOpen ? '200px' : '0',
                transition: 'width 0.3s',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100%',
                boxShadow: isOpen ? '2px 0 5px rgba(0,0,0,0.5)' : 'none'
            }}>
                {/* Sidebar content */}
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
            </div>
        </div>
    );
};

export default CollapsibleSidebar;