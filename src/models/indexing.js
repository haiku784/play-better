const mongoose = require('mongoose');
const Session = require('./session.model');

// Create indexes on the session collection
async function createIndexes() {
    try {
        await Session.init(); // Set up the model and indexes
        await Session.createIndexes({
            sessionId: 1,
            playerId: 1
        });
        console.log('Indexes created successfully');
    } catch (err) {
        console.error('Error creating indexes:', err);
    }
}

createIndexes();