const mongoose = require('mongoose');
const Session = require('./session.model');

// Configuration to connect to MongoDB
const uri = 'mongodb://localhost:27017/gameplay';

// Insert a new gameplay session
async function insertSession(sessionData) {
    try {
        await mongoose.connect(uri);
        const session = new Session(sessionData);
        await session.save();
        console.log('Session saved:', session);
    } catch (err) {
        console.error('Error inserting session data:', err);
    } finally {
        await mongoose.disconnect();
    }
}

// Example session data to be inserted
const exampleSession = {
    sessionId: 'sess1234',
    playerId: 'player1',
    gameId: 'gameA',
    score: 150,
    duration: 360
};

insertSession(exampleSession);