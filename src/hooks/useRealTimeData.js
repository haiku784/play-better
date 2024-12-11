import { useEffect, useState } from 'react';

// Custom hook to simulate real-time data updates
const useRealTimeData = (fetchDataFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await fetchDataFunction();
                setData(result);
            } catch (error) {
                console.error('Error fetching real-time data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Fetch data on mount

        const intervalId = setInterval(() => {
            fetchData(); // Fetch data every 5 seconds
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [fetchDataFunction]);

    return { data, loading };
};

export default useRealTimeData;