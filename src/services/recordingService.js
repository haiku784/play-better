const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.post('/record', (req, res) => {
    // Logic to start recording gameplay
    res.status(200).send('Recording started');
});

app.listen(PORT, () => {
    console.log(`Recording service listening on port ${PORT}`);
});