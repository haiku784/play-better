// Function to fetch insights based on userId and feedbackId
const fetchInsights = async (userId, feedbackId) => {
    const response = await fetch(`https://api.example.com/insights?userId=${userId}&feedbackId=${feedbackId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch insights');
    }
    const data = await response.json();
    return {
        insights: data.insights,
        followUpActions: data.followUpActions,
    };
};

export default fetchInsights;