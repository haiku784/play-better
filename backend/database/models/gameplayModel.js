// Assume we're using Mongoose schema for MongoDB
const mongoose = require('mongoose');

const gameplaySchema = new mongoose.Schema({
    userId: String,
    gameId: String,
    recordedData: Object,
    createdAt: { type: Date, default: Date.now }
});

// Index to optimize queries
gameplaySchema.index({ userId: 1, createdAt: -1 });

const Gameplay = mongoose.model('Gameplay', gameplaySchema);
module.exports = Gameplay;