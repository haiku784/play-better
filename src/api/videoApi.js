const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the Video Recording schema
const videoSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    videoUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Video = mongoose.model('Video', videoSchema);

// POST endpoint to save video recording
router.post('/recordings', async (req, res) => {
    const { userId, videoUrl } = req.body;
    const newVideo = new Video({ userId, videoUrl });
    try {
        await newVideo.save();
        res.status(201).send(newVideo);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to retrieve video recordings
router.get('/recordings/:userId', async (req, res) => {
    const recordings = await Video.find({ userId: req.params.userId });
    res.send(recordings);
});

module.exports = router;