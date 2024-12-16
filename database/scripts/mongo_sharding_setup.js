// Import MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/?replicaSet=myReplicaSet';

// Function to connect to MongoDB and configure sharding
async function setupMongoDB() {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB.');

        // Enable sharding for the "myDatabase"
        await client.db('admin').command({ enableSharding: 'myDatabase' });
        console.log('Sharding enabled for myDatabase.');

        // Shard the "orders" collection on "customer_id"
        await client.db('admin').command({ shardCollection: 'myDatabase.orders', key: { customer_id: 1 } });
        console.log('Shard setup for orders collection.');
    } catch (err) {
        console.error('Error setting up MongoDB sharding:', err);
    } finally {
        await client.close();
    }
}

// Call the setup function
setupMongoDB();