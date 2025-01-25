// onFPSSetCallback.js

// Callback function called after setting FPS value
const onFPSSet = ({ status, message }) => {
    console.log(`FPS Set Callback: Status - ${status}, Message - ${message}`);
    // Acknowledgment for FPS setting can be handled here
    return { acknowledgment: 'FPS setting acknowledged.' };
};

export default onFPSSet;