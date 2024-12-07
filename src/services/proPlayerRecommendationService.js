const express = require('express');
const app = express();
const PORT = process.env.PORT || 3004;

app.get('/pro-players', (req, res) => {
    // Logic for recommending pro players
    res.status(200).json([{ name: 'Pro Player 1' }, { name: 'Pro Player 2' }]);
});

app.listen(PORT, () => {
    console.log(`Pro player recommendation service listening on port ${PORT}`);
});