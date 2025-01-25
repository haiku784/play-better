// recordingService.js

// Service to handle video stream metrics
const recordingService = {
    // Sets the FPS value for a given stream
    setFps: (streamId, fpsValue) => {
        // Simulated API call to set FPS
        if (fpsValue > 0) {
            return Promise.resolve({ status: 'Success', message: 'FPS value set successfully.' });
        }
        return Promise.reject({ status: 'Error', message: 'Invalid FPS value.' });
    },

    // Sets the latency value for a given stream
    setLatency: (streamId, latencyValue) => {
        // Simulated API call to set Latency
        if (latencyValue >= 0) {
            return Promise.resolve({ status: 'Success', message: 'Latency value set successfully.' });
        }
        return Promise.reject({ status: 'Error', message: 'Invalid Latency value.' });
    }
};

export default recordingService;