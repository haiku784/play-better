const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    playerId: String,
    preferences: Object
});

module.exports = mongoose.model('ConfigData', configSchema);