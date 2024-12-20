const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uploadRoutes = require('./api/upload');
const userActionRoutes = require('./api/user_action');
const metricsRoutes = require('./api/metrics');

// Middleware setup
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Mount API routes
app.use('/api', uploadRoutes);
app.use('/api', userActionRoutes);
app.use('/api', metricsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});