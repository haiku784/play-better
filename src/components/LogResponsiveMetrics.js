const LogResponsiveMetrics = () => {
    // Function to log metrics when the window is resized
    const logMetrics = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(`Window resized: ${width} x ${height}`);
        // You might want to send this data to an analytics service
    };

    useEffect(() => {
        window.addEventListener('resize', logMetrics);
        // Cleanup to remove event listener
        return () => window.removeEventListener('resize', logMetrics);
    }, []);

    return null;
};

export default LogResponsiveMetrics;