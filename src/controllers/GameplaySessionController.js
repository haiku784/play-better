const GameplaySession = require('../models/GameplaySession');

// Controller to handle game sessions
const GameplaySessionController = {
    createSession: async (req, res) => {
        const sessionData = req.body; // Get the session data from the request body
        try {
            const newSession = new GameplaySession(sessionData); // Create a new session
            await newSession.save(); // Save the session to the database
            return res.status(201).json(newSession); // Respond with the created session
        } catch (error) {
            return res.status(500).json({ error: error.message }); // Handle error
        }
    },
    getSessions: async (req, res) => {
        try {
            const sessions = await GameplaySession.find({}); // Retrieve all sessions
            return res.status(200).json(sessions); // Respond with the sessions
        } catch (error) {
            return res.status(500).json({ error: error.message }); // Handle error
        }
    },
};

module.exports = GameplaySessionController; // Export the controller for use in routes
