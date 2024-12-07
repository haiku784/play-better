// Controller for handling gameplay recordings
const Gameplay = require('../models/Gameplay');

// Function to add a new gameplay recording
exports.addGameplayRecording = async (req, res) => {
    try {
        const newGameplay = new Gameplay(req.body);
        await newGameplay.save();
        return res.status(201).json(newGameplay);
    } catch (error) {
        return res.status(500).json({ message: 'Error saving gameplay recording', error });
    }
};

// Function to get all gameplay recordings for a user
exports.getUserRecordings = async (req, res) => {
    try {
        const recordings = await Gameplay.find({ userId: req.params.userId });
        return res.status(200).json(recordings);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching recordings', error });
    }
};