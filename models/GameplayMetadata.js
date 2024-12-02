import mongoose from 'mongoose';

const GameplayMetadataSchema = new mongoose.Schema({
  playerId: String,
  gameTitle: String,
  sessionDuration: Number,
  recordedAt: { type: Date, default: Date.now }
});

export const GameplayMetadata = mongoose.model('GameplayMetadata', GameplayMetadataSchema);