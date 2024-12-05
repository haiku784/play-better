const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    preferences: Object,
});

const UserProfile = mongoose.model('UserProfile', UserSchema);

module.exports = UserProfile;