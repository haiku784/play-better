import mongoose from 'mongoose';

const gameplaySchema = new mongoose.Schema({
    playerId: { type: String, required: true },
    sessionId: { type: String, required: true },
    gameTitle: { type: String, required: true },
    score: { type: Number, required: true },
    duration: { type: Number, required: true },
    actions: [{
        actionType: { type: String, required: true },
        timestamp: { type: Date, required: true },
        details: { type: String }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Gameplay = mongoose.model('Gameplay', gameplaySchema);

export default Gameplay;