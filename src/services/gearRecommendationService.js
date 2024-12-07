const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

app.get('/recommend-gear', (req, res) => {
    // Logic to recommend gear based on user data
    res.status(200).json([{ name: 'Gaming Mouse', price: 49.99 }]);
});

app.listen(PORT, () => {
    console.log(`Gear recommendation service listening on port ${PORT}`);
});