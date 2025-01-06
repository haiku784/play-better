import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
    const [loadTime, setLoadTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    useEffect(() => {
        // Start timing when the component mounts
        setStartTime(window.performance.now());

        // End timing when the component is unmounted (or use a specific condition)
        return () => {
            const end = window.performance.now();
            setEndTime(end);
            setLoadTime(end - startTime);
        };
    }, []);

    // Optional: Log the load time to an external service
    useEffect(() => {
        if (endTime > 0) {
            console.log(`Load time: ${loadTime} ms`);
            // Send loadTime to an analytics service or API here
        }
    }, [loadTime]);

    return (
        <div>
            <p>Performance Monitor is active.</p>
            <p>Load Time: {loadTime} ms</p>
        </div>
    );
};

export default PerformanceMonitor;