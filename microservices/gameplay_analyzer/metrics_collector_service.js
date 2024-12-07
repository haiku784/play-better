const express = require('express');
const app = express();
app.use(express.json());

// Endpoint to collect performance metrics
app.post('/collect', (req, res) => {
    const metrics = req.body;
    // Simulate saving metrics to a database or processing them
    console.log('Collected metrics:', metrics);
    res.status(201).json({ message: 'Metrics collected successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Performance Metrics Collector running on port ${PORT}`);
});