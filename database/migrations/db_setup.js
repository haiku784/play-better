// db_setup.js - Script for setting up and optimizing MongoDB schema.
const mongoose = require('mongoose');

const gameplaySchema = new mongoose.Schema({
    userId: String,
    videoUrl: String,
    annotations: Array,
}, { timestamps: true });

const Gameplay = mongoose.model('Gameplay', gameplaySchema);
module.exports = Gameplay;