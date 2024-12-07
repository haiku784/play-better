const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.post('/analyze', (req, res) => {
    // Logic for analyzing gameplay
    res.status(200).send('Gameplay analyzed');
});

app.listen(PORT, () => {
    console.log(`Analysis service listening on port ${PORT}`);
});