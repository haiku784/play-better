// MongoDB connection setup
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/esport';

// Function to connect to MongoDB"async function connectDB() {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to the database.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

connectDB();