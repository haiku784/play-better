// VideoAnnotationsRoutes.js
const express = require('express');
const router = express.Router();
const { addAnnotation, getAnnotations } = require('../controllers/VideoAnnotationsController');

// Route for saving a new annotation
router.post('/save', addAnnotation);

// Route for fetching annotations by video ID
router.get('/fetch/:videoId', getAnnotations);

module.exports = router;