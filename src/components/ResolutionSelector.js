import React from 'react';
import './ResolutionSelector.css'; // Importing CSS file for styles

const ResolutionSelector = ({ resolutionOptions, onChange }) => {
    return (
        <select className="resolution-selector" onChange={onChange}>
            {resolutionOptions.map(res => (
                <option key={res} value={res}>{res}</option>
            ))}
        </select>
    );
};

export default ResolutionSelector;
