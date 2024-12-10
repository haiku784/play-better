// Helper function to handle API calls for player follow/unfollow actions
export const followPlayer = async (playerId) => {
    return fetch(`/api/players/${playerId}/follow`, { method: 'POST' });
};

export const unfollowPlayer = async (playerId) => {
    return fetch(`/api/players/${playerId}/unfollow`, { method: 'POST' });
};