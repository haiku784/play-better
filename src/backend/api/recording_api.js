const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Model
const RecordingSchema = new mongoose.Schema({
    userId: String,
    videoUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const Recording = mongoose.model('Recording', RecordingSchema);

// Store gameplay recordings
app.post('/recordings', async (req, res) => {
    const { userId, videoUrl } = req.body;
    const recording = new Recording({ userId, videoUrl });
    await recording.save();
    res.status(201).send(recording);
});

// Retrieve gameplay recordings
app.get('/recordings/:userId', async (req, res) => {
    const recordings = await Recording.find({ userId: req.params.userId });
    res.send(recordings);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});