// Middleware for validating user data
const { body, validationResult } = require('express-validator');

// Validation checks for creating a user
const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
];

// Middleware function to handle validation results
const handleValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUser, handleValidationResults };