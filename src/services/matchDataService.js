const BASE_URL = '/api';

export const createVisualization = async ({ matchId, visualizationType, timeFrame }) => {
    const response = await fetch(`${BASE_URL}/createVisualization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, visualizationType, timeFrame }),
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
};