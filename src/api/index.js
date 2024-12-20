const express = require('express');
const uploadRouter = require('./upload');
const userActionRouter = require('./user_action');
const metricsRouter = require('./metrics');

const router = express.Router();

// Integrate all API routes
router.use('/api', uploadRouter);
router.use('/api', userActionRouter);
router.use('/api', metricsRouter);

module.exports = router;