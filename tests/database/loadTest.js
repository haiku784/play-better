// Import MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB URI and Database Constants
const uri = 'mongodb://localhost:27017';
const dbName = 'testDB';
const collectionName = 'users';

// Function to create a sample user
const createSampleUser = (index) => ({
    name: `User ${index}`,
    email: `user${index}@example.com`,
    age: Math.floor(Math.random() * 100),
    createdAt: new Date()
});

// Function to insert sample data into MongoDB
const insertSampleData = async (client) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Create an array of 1000 sample users
    const sampleUsers = Array.from({ length: 1000 }, (_, index) => createSampleUser(index + 1));

    // Insert sample users into the collection
    const result = await collection.insertMany(sampleUsers);
    console.log(`${result.insertedCount} users inserted.`);
};

// Main function to run the test
const runTest = async () => {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log('Connected to MongoDB');

        // Insert sample data
        await insertSampleData(client);
    } catch (err) {
        console.error('Error occurred while testing the database:', err);
    } finally {
        // Close the client
        await client.close();
        console.log('MongoDB connection closed.');
    }
};

// Execute the load test
runTest();