// MongoDB indexes for optimizing query performance on gameplay recordings
const mongoose = require('mongoose');
const Gameplay = require('./Gameplay');

// Create indexes to optimize query performance
async function optimizeIndexes() {
    await Gameplay.createIndexes({
        userId: 1,
        createdAt: -1
    });
    console.log('Indexes created for optimal query performance.');
}

optimizeIndexes();