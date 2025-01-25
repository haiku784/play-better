export const fetchTrends = async (category, filterOptions) => {
    const response = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, filterOptions }),
    });
    if (!response.ok) {
        throw new Error((await response.json()).message || 'Failed to fetch trends');
    }
    return await response.json();
};