// Function to initiate overlay of performance metrics
const startOverlay = (session_id) => {
    // Logic to start the overlay
    return new Promise((resolve, reject) => {
        // Simulate starting overlay
        const isStarted = true; // Simulate success
        if (isStarted) {
            resolve({ status: 'success', session_id });
        } else {
            reject({ status: 'failure', error: 'Unable to start overlay' });
        }
    });
};