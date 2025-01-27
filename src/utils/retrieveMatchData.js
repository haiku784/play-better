const retrieveMatchData = async (matchId) => {
    const response = await fetch(`/api/match/${matchId}`);
    if (!response.ok) {
        throw new Error('Failed to retrieve match data');
    }
    return await response.json();
};

export default retrieveMatchData;