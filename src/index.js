const mongoose = require('mongoose');
const mongodbConnection = require('./db/mongodbConnection');
const saveUser = require('./services/userService');
const generateReport = require('./reports/generateReport');

async function main() {
    // Setup MongoDB Connection
    await mongodbConnection();

    // Example user data
    const newUser = {
        username: 'esportStar',
        email: 'star@esports.com',
        wins: 10,
        losses: 2,
        totalGames: 12,
        favoriteGames: ['Game A', 'Game B']
    };

    // Save user data
    await saveUser(newUser);

    // Generate report
    await generateReport();
}

main().catch(console.error);