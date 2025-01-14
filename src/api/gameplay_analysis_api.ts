import express from 'express';
import { GameplaySession } from './types';

const app = express();
app.use(express.json());

app.post('/api/compare-sessions', async (req, res) => {
    const { sessionIds }: { sessionIds: number[] } = req.body;
    // Insert logic to retrieve comparative metrics based on sessionIds
    res.status(200).json({ metrics: 'some metrics' }); // Replace with actual metrics
});

export default app;