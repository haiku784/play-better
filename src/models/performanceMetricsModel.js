const mongoose = require('mongoose');

// Define the schema for Performance Metrics
const performanceMetricsSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true // Create index on sessionId for quick retrieval
    },
    metricType: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create the Performance Metrics model
const PerformanceMetrics = mongoose.model('PerformanceMetrics', performanceMetricsSchema);

// Function to create an index on performance metrics
async function createPerformanceMetricsIndex() {
    try {
        await PerformanceMetrics.createIndexes(); // Creating indexes on the specified fields
        console.log('Indexes created on Performance Metrics.');
    } catch (error) {
        console.error('Error creating indexes:', error);
    }
}

// Exporting the model and the index creation function
module.exports = {
    PerformanceMetrics,
    createPerformanceMetricsIndex
};