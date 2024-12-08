// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to MongoDB');
        // Call a function to perform operations on the collection
    } catch (e) {
        console.error(e);
    } finally {
        // Ensure that the client will close when you finish/error
        await client.close();
    }
}

// Run the connection function
run();