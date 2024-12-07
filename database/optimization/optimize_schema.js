// Import necessary MongoDB libraries
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function optimizeSchema() {
    try {
        await client.connect();
        const database = client.db('gameplay');
        const collection = database.collection('recordings');

        // Example index for performance optimization
        await collection.createIndex({ 'userId': 1, 'timestamp': -1 });
        console.log('Schema optimized with indexing.');
    } finally {
        await client.close();
    }
}

optimizeSchema().catch(console.error);
