export const fetchMatchReport = async (matchId) => {
    if (!matchId) throw new Error('Match ID is required'); // Validate input
    const response = await fetch(`/api/matchreport/${matchId}`); // Fetch match report
    if (!response.ok) throw new Error('Failed to fetch match report'); // Handle errors
    return await response.json(); // Return parsed JSON response
};