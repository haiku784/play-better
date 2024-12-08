const mongoose = require('mongoose');

// Define a schema for the user profile
const userProfileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username for each user
    email: { type: String, required: true, unique: true }, // User's email address
    profilePicture: { type: String, default: 'default.jpg' }, // URL to user's profile picture
    settings: {
        theme: { type: String, default: 'light' }, // User's preferred theme
        notifications: { type: Boolean, default: true } // Notification preference
    },
    gameStatistics: {
        totalGamesPlayed: { type: Number, default: 0 }, // Count of games played by the user
        totalWins: { type: Number, default: 0 }, // Count of games won by the user
        totalLosses: { type: Number, default: 0 }, // Count of games lost by the user
    },
    createdAt: { type: Date, default: Date.now }, // Timestamp for profile creation
});

// Export the model for usage in other parts of the application
const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;