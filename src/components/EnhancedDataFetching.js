import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';

const EnhancedDataFetching = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('API_ENDPOINT');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? <LoadingIndicator /> : <DataDisplay data={data} />}
        </div>
    );
};

const DataDisplay = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default EnhancedDataFetching;