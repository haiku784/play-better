// Update the connection string for MongoDB to use HTTPS
const mongoose = require('mongoose');

// Secure connection string using HTTPS
const connectionString = 'mongodb://username:password@secure-host:port/database?ssl=true';

// Connect to MongoDB using the updated connection string
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connection established successfully.'))
    .catch(err => console.error('Database connection error:', err));