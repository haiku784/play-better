import express from 'express';
import { Session } from './models/Session';

const router = express.Router();

// Endpoint to get all gameplay sessions
router.get('/sessions', async (req, res) => {
    try {
        const sessions = await Session.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;