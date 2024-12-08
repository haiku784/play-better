const mongoose = require('mongoose');
const User = require('../models/userModel');

// Function to generate report of user data
async function generateReport() {
    try {
        const users = await User.find({});
        // Construct report data
        const report = users.map(user => ({
            username: user.username,
            email: user.email,
            wins: user.wins,
            losses: user.losses,
            totalGames: user.totalGames,
            favoriteGames: user.favoriteGames
        }));
        console.log('Report generated successfully:', report);
        return report;
    } catch (error) {
        console.error('Error generating report:', error);
        throw error;
    }
}

module.exports = generateReport;