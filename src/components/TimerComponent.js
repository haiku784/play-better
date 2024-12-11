import React, { useState, useEffect } from 'react';

/**
 * TimerComponent tracks and displays elapsed time while recording is active.
 * It updates every second while recording is in progress and stops when recording ends.
 */
const TimerComponent = ({ isRecording }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isRecording) {
            timer = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        // Cleanup function to clear the interval when component unmounts or recording stops
        return () => clearInterval(timer);
    }, [isRecording]);

    return (
        <div>
            <h2>Recording Time</h2>
            <p>{elapsedTime} seconds</p>
        </div>
    );
};

export default TimerComponent;