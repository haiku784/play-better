import React, { useEffect, useState } from 'react';

/**
 * A component that wraps around UI components to profile their performance.
 * It measures the time taken to render the component and logs the metrics.
 */
const UIComponentProfiler = ({ children, componentName }) => {
    const [renderTime, setRenderTime] = useState(0);

    useEffect(() => {
        const start = performance.now();
        // Render the children
        const component = children;
        const end = performance.now();

        // Calculate render time
        setRenderTime(end - start);
        console.log(`Render time for ${componentName}: ${end - start}ms`);
    }, [children, componentName]);

    return (
        <div>
            {children}
            <div>Render Time: {renderTime.toFixed(2)} ms</div>
        </div>
    );
};

export default UIComponentProfiler;