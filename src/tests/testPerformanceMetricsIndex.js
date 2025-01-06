const mongoose = require('mongoose');
const { PerformanceMetrics, createPerformanceMetricsIndex } = require('../models/performanceMetricsModel');

// Connect to the MongoDB database
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear the database before each test
beforeEach(async () => {
    await PerformanceMetrics.deleteMany();
});

// Test the index creation functionality
describe('Performance Metrics Indexing', () => {
    it('should create an index on sessionId', async () => {
        await createPerformanceMetricsIndex();
        const indexes = await PerformanceMetrics.collection.indexes();
        const sessionIdIndex = indexes.find(index => index.key.sessionId);
        expect(sessionIdIndex).toBeTruthy(); // Ensure index on sessionId exists
    });
});

// Close the database connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});