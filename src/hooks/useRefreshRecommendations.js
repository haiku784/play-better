import { useEffect } from 'react';
import axios from 'axios';

const useRefreshRecommendations = (user_id, setRecommendations) => {
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`/api/recommendations?user_id=${user_id}`);
                setRecommendations(response.data.newRecommendations);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [user_id, setRecommendations]);
};

export default useRefreshRecommendations;