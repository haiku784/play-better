// Import necessary libraries
const mongoose = require('mongoose');
const ESportTitle = require('./models/eSportTitle');

// Database connection settings
const uri = 'mongodb://localhost:27017/esports';

async function insertSampleData() {
  try {
    // Connect to the database
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Database');

    // Sample data
    const sampleTitles = [
      { title: 'League of Legends', genre: 'MOBA', releaseDate: new Date('2009-10-27'), developer: 'Riot Games' },
      { title: 'Dota 2', genre: 'MOBA', releaseDate: new Date('2013-07-09'), developer: 'Valve Corporation' },
      { title: 'Counter-Strike: Global Offensive', genre: 'FPS', releaseDate: new Date('2012-08-21'), developer: 'Valve Corporation' },
    ];

    // Insert sample data
    await ESportTitle.insertMany(sampleTitles);
    console.log('Sample data inserted');
  } catch (error) {
    console.error(error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}

insertSampleData();