const express = require('express');
const router = express.Router();

let userActions = []; // This will store user actions temporarily

// API endpoint for tracking user actions
router.post('/user-action', (req, res) => {
    const { action, userId } = req.body;

    if (!action || !userId) {
        return res.status(400).json({ message: 'Action and User ID are required.' });
    }

    // Store user action
    userActions.push({ action, userId, timestamp: new Date() });
    res.status(201).json({ message: 'User action recorded.' });
});

// API endpoint for retrieving user actions
router.get('/user-action/:userId', (req, res) => {
    const { userId } = req.params;
    const actions = userActions.filter(action => action.userId === userId);
    res.status(200).json(actions);
});

module.exports = router;