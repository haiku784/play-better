// Middleware for error handling in Express.js
const createError = require('http-errors');

function errorHandler(err, req, res, next) {
    // Set default status code to 500
    const status = err.status || 500;
    // Log the error details for troubleshooting
    console.error(err);
    // Send formatted error response
    res.status(status).json({
        status: 'error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
}

module.exports = errorHandler;