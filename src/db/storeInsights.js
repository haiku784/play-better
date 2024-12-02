const { MongoClient } = require('mongodb');

async function storeInsights(insights) {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('gameplay');
    const collection = database.collection('insights');
    await collection.insertOne(insights);
    await client.close();
}