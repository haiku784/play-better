const User = require('./User');

async function addUserWithTitles(username, email, titles) {
    const newUser = new User({
        username,
        email,
        esportsTitles: titles
    });
    try {
        const savedUser = await newUser.save();
        console.log('User added:', savedUser);
        return savedUser;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}