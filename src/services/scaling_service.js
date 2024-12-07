// Import essential libraries
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
let db;

async function connectDB() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    db = client.db('gameplay_db');
}

app.get('/gameplay/:playerId', async (req, res) => {
    const playerId = parseInt(req.params.playerId);
    const data = await db.collection('recordings').find({ player_id: playerId }).toArray();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

connectDB();