const User = require('./User');

async function updateUserStats(username, title, wins, losses) {
    try {
        const user = await User.findOneAndUpdate(
            { username: username, 'esportsTitles.title': title },
            { $inc: {'esportsTitles.$.stats.wins': wins, 'esportsTitles.$.stats.losses': losses} },
            { new: true }
        );
        return user;
    } catch (error) {
        console.error('Error updating user stats:', error);
        throw error;
    }
}