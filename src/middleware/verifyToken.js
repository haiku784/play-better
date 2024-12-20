const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

// Middleware to check token
const verifyToken = (req, res, next) => {
    // Get token from headers
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    // Verify token
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id; // Store user ID in request for access control
        next();
    });
};

module.exports = verifyToken;