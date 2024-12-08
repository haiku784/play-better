// Importing mongoose
const mongoose = require('mongoose');

// Creating a schema for e-sport titles
const titleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    platform: { type: [String], required: true },
    players: { type: Number, required: true }
});

// Creating a model from the schema
const Title = mongoose.model('Title', titleSchema);

// Exporting the model
module.exports = Title;