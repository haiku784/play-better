const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    totalGames: { type: Number, default: 0 },
    favoriteGames: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;