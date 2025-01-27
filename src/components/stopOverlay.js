// Function to terminate overlay session
const stopOverlay = (session_id) => {
    // Logic to stop the overlay
    return new Promise((resolve, reject) => {
        // Simulate stopping overlay
        const isStopped = true; // Simulate success
        if (isStopped) {
            resolve({ status: 'success', message: 'Overlay session stopped.' });
        } else {
            reject({ status: 'failure', error: 'Unable to stop overlay' });
        }
    });
};