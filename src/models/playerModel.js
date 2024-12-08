// Importing mongoose
const mongoose = require('mongoose');

// Creating a schema for e-sport players
const playerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    nationality: { type: String, required: true },
    age: { type: Number, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    titlesWon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Title' }]
});

// Creating a model from the schema
const Player = mongoose.model('Player', playerSchema);

// Exporting the model
module.exports = Player;