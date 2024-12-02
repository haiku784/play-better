// MongoDB schema for storing gameplay sessions
const mongoose = require('mongoose');

const GameplaySessionSchema = new mongoose.Schema({
    id: String,
    playerId: String,
    duration: Number,
});

module.exports = mongoose.model('GameplaySession', GameplaySessionSchema);