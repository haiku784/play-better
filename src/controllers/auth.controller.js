const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

// Function to authenticate user
const authenticateUser = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }, (err, user) => {
        if (err) return res.status(500).send({ message: err.message });
        if (!user) return res.status(404).send({ message: 'User Not found.' });

        // Check password
        if (password !== user.password) {
            return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
        }

        // Create JWT token
        const accessToken = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ accessToken });
    });
};

module.exports = { authenticateUser };