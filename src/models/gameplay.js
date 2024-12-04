const mongoose = require('mongoose');

const gameplaySchema = new mongoose.Schema({
  playerId: String,
  sessionData: Array,
  timestamp: { type: Date, default: Date.now }
});

const Gameplay = mongoose.model('Gameplay', gameplaySchema);

async function saveGameplayData(playerId, sessionData) {
  const gameplay = new Gameplay({ playerId, sessionData });
  await gameplay.save();
}

module.exports = { saveGameplayData };