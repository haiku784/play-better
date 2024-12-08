const User = require('./User');

async function getUserStatsByTitle(username, title) {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const titleStats = user.esportsTitles.find(t => t.title === title);
        return titleStats ? titleStats.stats : null;
    } catch (error) {
        console.error('Error retrieving stats:', error);
        throw error;
    }
}