const { MongoClient } = require('mongodb');

// Connecting to MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'gameplay_analyzer';

async function connectDb() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

// Inserting insights and statistics
async function insertInsights(insightData) {
    const db = await connectDb();
    const collection = db.collection('insights');
    const result = await collection.insertOne(insightData);
    return result.insertedId;
}

// Retrieving insights and statistics
async function retrieveInsights() {
    const db = await connectDb();
    const collection = db.collection('insights');
    return await collection.find({}).toArray();
}