const express = require('express');
const User = require('./models/user');
const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// API Endpoint to create a new user profile
router.post('/users', async (req, res) => {
    const { username, email, bio, preferences } = req.body;
    const newUser = new User({ username, email, bio, preferences });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error saving user profile', error });
    }
});

// API Endpoint to retrieve user profiles
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error });
    }
});

module.exports = router;