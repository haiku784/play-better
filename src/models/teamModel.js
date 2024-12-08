// Importing mongoose
const mongoose = require('mongoose');

// Creating a schema for e-sport teams
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    founded: { type: Date, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    titles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Title' }]
});

// Creating a model from the schema
const Team = mongoose.model('Team', teamSchema);

// Exporting the model
module.exports = Team;