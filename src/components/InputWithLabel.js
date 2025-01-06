import React from 'react';

/**
 * InputWithLabel component renders a labeled input element.
 * @param {string} label - The label for the input.
 * @param {string} value - The current value of the input.
 * @param {function} onChange - The function to call on input change.
 * @param {string} type - The type of the input (default is 'text').
 * @param {string} id - Unique identifier for the input.
 */
const InputWithLabel = ({ label, value, onChange, type = 'text', id }) => {
    return (
        <div>
            {/* Label element linked to input via htmlFor and id */}
            <label htmlFor={id}>{label}</label>
            <input 
                type={type} 
                id={id} 
                value={value} 
                onChange={onChange} 
                aria-labelledby={id}
                required
            />
        </div>
    );
};

export default InputWithLabel;