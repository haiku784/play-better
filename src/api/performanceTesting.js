const { performance } = require('perf_hooks');
const tuneMongoDB = require('./tuneMongoDB');

async function testQueryPerformance(uri) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('testDB');

    const start = performance.now();
    await db.collection('testCollection').find({}).toArray();  // Example query
    const end = performance.now();

    console.log(`Query execution time: ${end - start} ms`);
    await client.close();
}

async function runPerformanceTests() {
    const uri = 'mongodb://localhost:27017';
    await tuneMongoDB(uri);
    await testQueryPerformance(uri);
}

runPerformanceTests();