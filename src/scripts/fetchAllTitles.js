// Import necessary libraries
const mongoose = require('mongoose');
const ESportTitle = require('./models/eSportTitle');

// Database connection settings
const uri = 'mongodb://localhost:27017/esports';

async function fetchAllTitles() {
  try {
    // Connect to the database
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Database');

    // Retrieve all e-sport titles
    const titles = await ESportTitle.find();
    console.log('Retrieved titles:', titles);
  } catch (error) {
    console.error(error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}

fetchAllTitles();