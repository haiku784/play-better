import React from 'react';
import ResolutionSelector from './ResolutionSelector';
import FrameRateSelector from './FrameRateSelector';

// Main container component to hold resolution and frame rate selectors
const RecordingOptionsContainer = () => {
    const handleResolutionChange = (newResolution) => {
        console.log('Selected Resolution:', newResolution);
    };

    const handleFrameRateChange = (newFrameRate) => {
        console.log('Selected Frame Rate:', newFrameRate);
    };

    return (
        <div>
            <h2>Select Recording Options</h2>
            <ResolutionSelector onResolutionChange={handleResolutionChange} />
            <FrameRateSelector onFrameRateChange={handleFrameRateChange} />
        </div>
    );
};

export default RecordingOptionsContainer;