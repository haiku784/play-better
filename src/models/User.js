const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Create the User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;