// Function to log performance metrics
const logPerformanceMetrics = () => {
    if (performance && performance.getEntriesByType) {
        const metrics = performance.getEntriesByType('navigation');
        console.log('Performance metrics:', metrics);
        // Further processing of metrics can be done here
    }
};

window.addEventListener('load', logPerformanceMetrics);
