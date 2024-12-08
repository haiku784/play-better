// Import MongoClient from the MongoDB library
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

run();