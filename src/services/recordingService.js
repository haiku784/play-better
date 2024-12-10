const { decrypt } = require('./encryption');
const Recording = require('../models/recording');

// Function to retrieve and decrypt recording by userId
async function getRecording(userId) {
    const recording = await Recording.findOne({ userId: userId });
    if (!recording) {
        throw new Error('Recording not found');
    }
    const decryptedData = decrypt(recording.data);
    return JSON.parse(decryptedData);
}

module.exports = { getRecording };