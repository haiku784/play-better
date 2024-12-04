const mongoose = require('mongoose');

const playerPreferenceSchema = new mongoose.Schema({
    playerId: String,
    preferences: Object,
    createdAt: { type: Date, default: Date.now }
});

const PlayerPreference = mongoose.model('PlayerPreference', playerPreferenceSchema);
module.exports = PlayerPreference;