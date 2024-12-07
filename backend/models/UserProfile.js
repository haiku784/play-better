const mongoose = require('mongoose');

// User Profile Schema definition
const userProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    preferences: {
        type: Object,
        default: {}
    },
    gameplayRecords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameplayRecord'
    }]
}, { timestamps: true });

// Export the UserProfile model
module.exports = mongoose.model('UserProfile', userProfileSchema);