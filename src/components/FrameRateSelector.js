import React from 'react';
import './FrameRateSelector.css'; // Importing CSS file for styles

const FrameRateSelector = ({ frameRateOptions, onChange }) => {
    return (
        <select className="frame-rate-selector" onChange={onChange}>
            {frameRateOptions.map(rate => (
                <option key={rate} value={rate}>{rate} fps</option>
            ))}
        </select>
    );
};

export default FrameRateSelector;
