const express = require('express');
const router = express.Router();
const GameplaySessionController = require('../controllers/GameplaySessionController');

// Define routes for gameplay sessions
router.post('/sessions', GameplaySessionController.createSession); // Create a new session
router.get('/sessions', GameplaySessionController.getSessions); // Get all sessions

module.exports = router; // Export the routes
