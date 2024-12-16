const express = require('express');
const consul = require('consul')();

const app = express();
const port = 3000;

// Register service with Consul
consul.agent.service.register({
    name: 'my-service',
    address: 'localhost',
    port: port,
    check: {
        http: `http://localhost:${port}/health`,
        interval: '10s'
    }
}, (err) => {
    if (err) throw err;
    console.log('Service registered with Consul');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Service listening on port ${port}`);
});