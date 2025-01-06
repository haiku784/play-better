import React from 'react';

/**
 * AccessibleText component renders text with accessibility in mind.
 * It ensures proper labeling and roles are provided for screen readers.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.text - The text to display.
 * @param {string} [props.role] - ARIA role for the text (defaults to 'text').
 */
const AccessibleText = ({ text, role = 'text' }) => {
    return (
        <span role={role} aria-label={text} className="accessible-text">
            {text}
        </span>
    );
};

export default AccessibleText;
