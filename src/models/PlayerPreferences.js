const mongoose = require('mongoose');

const playerPreferencesSchema = new mongoose.Schema({
    playerId: { type: String, required: true },
    preferredSettings: {
        resolution: { type: String, default: '1920x1080' },
        sensitivity: { type: Number, default: 1.0 },
        keyBindings: { type: Object, default: {} }
    },
    gameplayStyles: [{
        style: { type: String, required: true },
        description: { type: String }
    }]
}, { timestamps: true });

const PlayerPreferences = mongoose.model('PlayerPreferences', playerPreferencesSchema);

module.exports = PlayerPreferences;