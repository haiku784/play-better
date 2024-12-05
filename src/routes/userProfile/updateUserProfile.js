const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update User Profile
router.patch('/:id', async (req, res) => {
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;