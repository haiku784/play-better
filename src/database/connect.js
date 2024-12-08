// Load the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URL
const uri = 'mongodb://localhost:27017';
// Database Name
const dbName = 'esportDB';
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to the MongoDB client
        await client.connect();
        // Select the database
        const db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();