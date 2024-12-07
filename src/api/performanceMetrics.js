// performanceMetrics.js
// Express.js API to handle requests for performance metrics.
const express = require('express');
const router = express.Router();

// Mock data for demonstration purposes
let mockMetrics = {
    score: 95,
    accuracy: 88,
    rating: 'Excellent'
};

// Endpoint to get performance metrics
router.get('/performance-metrics', (req, res) => {
    res.json(mockMetrics);
});

module.exports = router;