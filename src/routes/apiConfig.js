// API endpoint configuration to ensure all requests are made over HTTPS
const express = require('express');
const app = express();

// Middleware to force HTTPS connection
app.use((req, res, next) => {
    if (req.secure) {
        return next(); // Request was via HTTPS
    }
    // Redirect to HTTPS
    res.redirect('https://' + req.headers.host + req.url);
});

// Example of HTTPS API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is a secure response!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));