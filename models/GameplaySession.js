const mongoose = require('mongoose');

const gameplaySessionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    gameTitle: { type: String, required: true },
    recordedData: { type: Buffer, required: true },
    metadata: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
});

const GameplaySession = mongoose.model('GameplaySession', gameplaySessionSchema);

module.exports = GameplaySession;