const express = require('express');
const mongoose = require('mongoose');
const gameplaySessionRoutes = require('./routes/GameplaySessionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/gameplay', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes setup
app.use('/api/gameplay-sessions', gameplaySessionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});