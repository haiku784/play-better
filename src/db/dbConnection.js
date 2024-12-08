// Importing MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';

// Creating a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database!');
        return client.db('esport_titles');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

// Exporting the connection function
module.exports = connectToDatabase;