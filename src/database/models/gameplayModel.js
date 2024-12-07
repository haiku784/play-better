// MongoDB schema design example for optimizing gameplay data storage
const mongoose = require('mongoose');
const gameplaySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    performanceData: { type: Object, required: true },
    recordedAt: { type: Date, default: Date.now },
});

const Gameplay = mongoose.model('Gameplay', gameplaySchema);

module.exports = Gameplay;