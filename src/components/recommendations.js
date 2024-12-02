// Function to fetch configuration recommendations based on e-sport title
const getRecommendations = async (title) => {
    const response = await fetch(`/api/recommendations?title=${title}`);
    const data = await response.json();
    return data;
};