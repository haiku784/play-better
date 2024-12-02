const { MongoClient } = require('mongodb');

async function storeAnnotation(annotation) {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const database = client.db('gameplay');
    const annotationsCollection = database.collection('annotations');

    const result = await annotationsCollection.insertOne(annotation);
    console.log(`New annotation created with the following id: ${result.insertedId}`);
    await client.close();
}