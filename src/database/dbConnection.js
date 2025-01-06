const mongoose = require('mongoose');

// MongoDB connection URI
const MONGO_URI = 'mongodb://localhost:27017/mydatabase'; // Change to your database URI

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error: ', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // Export the connection function
