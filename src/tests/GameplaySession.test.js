const request = require('supertest');
const app = require('../api/app'); // Assuming your Express app is exported here
const GameplaySession = require('../models/GameplaySession');

describe('GameplaySession API', () => {
    // Clean up database before each test
    beforeEach(async () => {
        await GameplaySession.deleteMany();
    });

    test('POST /sessions - Create a new gameplay session', async () => {
        const sessionData = { playerID: 'player1', sessionStart: new Date(), sessionEnd: new Date(), score: 100, duration: 60 };
        const response = await request(app)
            .post('/sessions')
            .send(sessionData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    test('GET /sessions - Retrieve all gameplay sessions', async () => {
        await GameplaySession.create({ playerID: 'player1', sessionStart: new Date(), sessionEnd: new Date(), score: 100, duration: 60 });
        const response = await request(app).get('/sessions');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Additional tests for other CRUD operations can be added here.
});