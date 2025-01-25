import axios from 'axios';

// Function to fetch feedbacks based on productId
export const retrieveFeedbacks = async ({ productId }) => {
    const response = await axios.get(`/api/feedbacks?productId=${productId}`);
    return response.data;
};