const mongoose = require('mongoose');

const gameplayDataSchema = new mongoose.Schema({
    sessionId: String,
    playerId: String,
    gameplayDetails: Object
});

module.exports = mongoose.model('GameplayData', gameplayDataSchema);