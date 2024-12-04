const { MongoClient } = require('mongodb');

async function storeGameplayData(playbackData) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('gameplay');
        const collection = database.collection('recordings');
        await collection.insertOne(playbackData);
    } finally {
        await client.close();
    }
}