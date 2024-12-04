const { MongoClient } = require('mongodb');

async function storeUserAnnotations(annotationData) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('gameplay');
        const collection = database.collection('annotations');
        await collection.insertOne(annotationData);
    } finally {
        await client.close();
    }
}