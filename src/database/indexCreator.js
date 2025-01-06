const GameplaySession = require('../models/GameplaySession');

// Function to create necessary indexes for optimizing database queries
const createIndexes = async () => {
    try {
        await GameplaySession.createIndexes({
            sessionId: 1, // Index on sessionId for fast retrieval
            userId: 1, // Index on userId for retrieving sessions by user
            startTime: -1 // Index on startTime for sorting sessions by time
        });
        console.log('Indexes created successfully!');
    } catch (err) {
        console.error('Error creating indexes: ', err);
    }
};

module.exports = createIndexes; // Export the function to create indexes
