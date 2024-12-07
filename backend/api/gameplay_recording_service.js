const express = require('express');
const app = express();
app.use(express.json());

let recordings = {};

app.post('/recordings/start', (req, res) => {
    const { user_id, session_id } = req.body;
    if (user_id && session_id) {
        recordings[session_id] = { user_id, status: 'recording' };
        return res.status(200).json({ message: 'Recording started', session_id });
    }
    return res.status(400).json({ error: 'Invalid input' });
});

app.post('/recordings/stop', (req, res) => {
    const { session_id } = req.body;
    if (session_id in recordings && recordings[session_id].status === 'recording') {
        recordings[session_id].status = 'stopped';
        return res.status(200).json({ message: 'Recording stopped', session_id });
    }
    return res.status(404).json({ error: 'No active recording found for this session' });
});

app.listen(3000, () => {
    console.log('Gameplay recording service running on http://localhost:3000');
});