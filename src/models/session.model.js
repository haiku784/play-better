const mongoose = require('mongoose');

// Define a schema for the gameplay session data
const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    playerId: {
        type: String,
        required: true
    },
    gameId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the schema
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;