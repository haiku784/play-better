const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create User Profile
router.post('/', async (req, res) => {
    const { username, email, preferences } = req.body;
    try {
        const user = new User({ username, email, preferences });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;