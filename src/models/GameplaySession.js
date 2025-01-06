const mongoose = require('mongoose');

// Define the schema for a Gameplay Session
const gameplaySessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },  // Unique session identifier
    userId: { type: String, required: true }, // User ID associated with the session
    startTime: { type: Date, required: true, default: Date.now }, // Session start time
    duration: { type: Number, required: true }, // Duration of the session in seconds
    resolution: { type: String, required: true }, // Resolution of the recording
    frameRate: { type: Number, required: true }, // Frame rate of the recording
    fileSize: { type: Number, required: true }, // Size of the recorded file in MB
    metadata: { type: Object }, // Additional metadata for the session
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: 'gameplay_sessions', // Collection name in MongoDB
});

// Create the model from the schema
const GameplaySession = mongoose.model('GameplaySession', gameplaySessionSchema);

module.exports = GameplaySession; // Export the model for use in other parts of the application
