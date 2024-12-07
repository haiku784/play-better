// MongoDB schema for storing gameplay recordings and metadata
const mongoose = require('mongoose');

// Define the schema for gameplay recording
const gameplaySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recordingUrl: { type: String, required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    metadata: {
        platform: { type: String, required: true },
        resolution: { type: String, required: true },
        framerate: { type: Number, required: true },
        gameTitle: { type: String, required: true }
    }
});

// Create the model from the schema
module.exports = mongoose.model('Gameplay', gameplaySchema);