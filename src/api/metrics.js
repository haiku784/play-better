const express = require('express');
const router = express.Router();

let metrics = []; // Temporary storage for metrics data

// API endpoint for submitting gameplay metrics
router.post('/metrics', (req, res) => {
    const { userId, performanceData } = req.body;

    if (!userId || !performanceData) {
        return res.status(400).json({ message: 'User ID and performance data are required.' });
    }

    // Store metrics data
    metrics.push({ userId, performanceData, timestamp: new Date() });
    res.status(201).json({ message: 'Metrics submitted successfully.' });
});

// API endpoint for retrieving gameplay metrics
router.get('/metrics/:userId', (req, res) => {
    const { userId } = req.params;
    const userMetrics = metrics.filter(metric => metric.userId === userId);
    res.status(200).json(userMetrics);
});

module.exports = router;