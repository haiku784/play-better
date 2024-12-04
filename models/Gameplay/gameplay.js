const mongoose = require('mongoose');

const gameplaySchema = new mongoose.Schema({
    playerId: String,
    sessionData: Object,
    recordedAt: { type: Date, default: Date.now }
});

const Gameplay = mongoose.model('Gameplay', gameplaySchema);
module.exports = Gameplay;