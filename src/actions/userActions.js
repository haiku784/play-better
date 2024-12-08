// Example of a simple action creator function
export const fetchUserRequest = () => ({ type: 'FETCH_USER_REQUEST' });

export const fetchUserSuccess = (user) => ({
    type: 'FETCH_USER_SUCCESS',
    payload: user
});

export const fetchUserFailure = (error) => ({
    type: 'FETCH_USER_FAILURE',
    payload: error
});