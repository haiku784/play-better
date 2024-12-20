const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Example secure route
router.get('/api/protected', verifyToken, (req, res) => {
    res.status(200).send({ message: 'This is a protected route!', userId: req.userId });
});

module.exports = router;