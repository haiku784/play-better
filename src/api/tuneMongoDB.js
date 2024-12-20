const MongoClient = require('mongodb').MongoClient;

// MongoDB configuration settings
const config = {
    cacheSize: 1024, // In MB
    maxConnections: 100,
};

async function tuneMongoDB(uri) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const adminDb = client.db().admin();

        // Setting cache size
        await adminDb.command({ setParameter: 1, internalCacheSize: config.cacheSize * 1024 * 1024 });
        console.log(`Cache size set to ${config.cacheSize} MB.`);

        // Setting max connections
        await adminDb.command({ setParameter: 1, maxIncomingConnections: config.maxConnections });
        console.log(`Max connections set to ${config.maxConnections}.`);
    } catch (error) {
        console.error('Error tuning MongoDB settings:', error);
    } finally {
        await client.close();
    }
}

module.exports = tuneMongoDB;