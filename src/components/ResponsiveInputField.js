import React from 'react';
import './ResponsiveInputField.css';

/**
 * A responsive input field component designed for usability on various devices.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The change handler for the input field.
 */
const ResponsiveInputField = ({ label, value, onChange }) => {
    return (
        <div className="responsive-input-field">
            <label>{label}</label>
            <input type="text" value={value} onChange={onChange} />
        </div>
    );
};

export default ResponsiveInputField;