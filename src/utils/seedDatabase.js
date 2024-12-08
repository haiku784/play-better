// Importing necessary modules
const mongoose = require('mongoose');
const connectToDatabase = require('../db/dbConnection');
const Title = require('../models/titleModel');
const Team = require('../models/teamModel');
const Player = require('../models/playerModel');

// Function to seed the database with sample data
async function seedDatabase() {
    const db = await connectToDatabase();

    // Sample Titles
    const titles = [
        { name: 'Game A', releaseDate: new Date('2023-01-01'), genre: 'MOBA', developer: 'Dev A', publisher: 'Pub A', platform: ['PC', 'Console'], players: 10 },
        { name: 'Game B', releaseDate: new Date('2022-12-01'), genre: 'FPS', developer: 'Dev B', publisher: 'Pub B', platform: ['PC', 'Console'], players: 20 }
    ];
    await Title.insertMany(titles);

    // Sample Teams
    const teams = [
        { name: 'Team Alpha', founded: new Date('2020-01-01'), players: [], titles: [] },
        { name: 'Team Beta', founded: new Date('2021-01-01'), players: [], titles: [] }
    ];
    await Team.insertMany(teams);

    // Sample Players
    const players = [
        { username: 'PlayerOne', nationality: 'USA', age: 25, teams: [], titlesWon: [] },
        { username: 'PlayerTwo', nationality: 'UK', age: 22, teams: [], titlesWon: [] }
    ];
    await Player.insertMany(players);

    console.log('Sample data has been seeded!');
    mongoose.connection.close();
}

seedDatabase();