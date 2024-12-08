// Example of data operations on User documents in MongoDB
const mongoose = require('mongoose');
const User = require('./models/user.model');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Function to create a new user
async function createUser(username, email, password) {
    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log('User created:', newUser);
}

// Function to find a user by username
async function findUserByUsername(username) {
    const user = await User.findOne({ username });
    console.log('User found:', user);
}

// Export the functions for use in other parts of the application
module.exports = { createUser, findUserByUsername };