// server.js
// Basic setup of an Express.js server to serve the performance metrics API
const express = require('express');
const bodyParser = require('body-parser');
const performanceMetricsRouter = require('./api/performanceMetrics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', performanceMetricsRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});