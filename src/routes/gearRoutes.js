const express = require('express');
const router = express.Router();
const GearRecommendationService = require('../services/GearRecommendationService');

// Route to get gear recommendations for a user
router.get('/', async (req, res) => {
    const userId = req.user.id; // assuming user is authenticated
    try {
        const recommendations = await GearRecommendationService.getRecommendations(userId);
        res.json(recommendations);
    } catch (err) {
        console.error('Error fetching gear recommendations:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;