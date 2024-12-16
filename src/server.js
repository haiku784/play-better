const https = require('https');
const fs = require('fs');
const express = require('express');

// Create an Express application
const app = express();

// Path to certificate and key files
const options = {
    key: fs.readFileSync('certs/server.key'),
    cert: fs.readFileSync('certs/server.crt')
};

app.get('/', (req, res) => {
    res.send('Hello, this is a secure server!');
});

// Create HTTPS server
https.createServer(options, app)
    .listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });