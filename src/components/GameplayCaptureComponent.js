import React, { useEffect } from 'react';
import PerformanceCapture from './performanceCapture';

/**
 * React component that manages gameplay capture and displays performance
 * metrics or captured frames to the user.
 */
const GameplayCaptureComponent = () => {
    const capture = new PerformanceCapture();

    useEffect(() => {
        capture.startCapture(); // Start capturing on mount

        return () => {
            capture.stopCapture(); // Stop capturing on unmount
        };
    }, []);

    return (
        <div>
            <h2>Gameplay Capture</h2>
            <button onClick={() => console.log(capture.getCapturedFrames())}>Get Captured Frames</button>
        </div>
    );
};

export default GameplayCaptureComponent;
