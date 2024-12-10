const crypto = require('crypto');
const mongoose = require('mongoose');

// Encryption configuration
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Use a secure key management in production
const iv = crypto.randomBytes(16);

// Encrypt function
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

// Decrypt function
function decrypt(encryption) {
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(encryption.iv, 'hex'));
    let decrypted = decipher.update(encryption.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// MongoDB schema for user recordings
const recordingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    data: { type: Object, required: true }, // encryption data
    createdAt: { type: Date, default: Date.now }
});

const Recording = mongoose.model('Recording', recordingSchema);

// Function to save encrypted recording
async function saveRecording(userId, data) {
    const encryptedData = encrypt(JSON.stringify(data));
    const recording = new Recording({
        userId: userId,
        data: encryptedData
    });
    await recording.save();
}

module.exports = { saveRecording, decrypt };