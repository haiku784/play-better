import React from 'react';
import './ResponsiveButton.css';

/**
 * A button component designed to be responsive and with appropriate touch targets.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the button.
 * @param {function} props.onClick - The click handler for the button.
 */
const ResponsiveButton = ({ label, onClick }) => {
    return (
        <button className="responsive-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default ResponsiveButton;