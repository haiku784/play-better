// MongoDB schema for User documents using Mongoose
const mongoose = require('mongoose');

// Define schema for User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);