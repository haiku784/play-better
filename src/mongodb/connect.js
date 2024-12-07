// Require the MongoDB driver
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Connection error:', err);
    } finally {
        // Close the client
        await client.close();
    }
}

run();