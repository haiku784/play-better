// MongoDB schema for pro players
const mongoose = require('mongoose');

const ProPlayerSchema = new mongoose.Schema({
    name: String,
    gameTitle: String,
});

module.exports = mongoose.model('ProPlayer', ProPlayerSchema);