// Function to fetch configuration recommendations based on e-sport title
const getRecommendations = async (title: string): Promise<Recommendations[]> => {
    const response = await fetch(`/api/recommendations?title=${title}`);
    return await response.json();
};