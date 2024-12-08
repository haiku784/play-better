// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017'; // Connection URL
const client = new MongoClient(uri);

async function createIndex() {
    try {
        await client.connect(); // Connect to the database
        const database = client.db('esportDB'); // Database name
        const collection = database.collection('titles'); // Collection name

        // Create an index on the 'title' field
        const result = await collection.createIndex({ title: 1 }); // Ascending index
        console.log('Index created:', result);
    } catch (error) {
        console.error('Error creating index:', error);
    } finally {
        await client.close(); // Close connection
    }
}

createIndex();