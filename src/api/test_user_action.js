const request = require('supertest');
const app = require('../server');

describe('POST /api/user-action', () => {
    it('should record a user action successfully', async () => {
        const response = await request(app)
            .post('/api/user-action')
            .send({ action: 'start_game', userId: 'user123' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User action recorded.');
    });

    it('should return error for missing action', async () => {
        const response = await request(app)
            .post('/api/user-action')
            .send({ userId: 'user123' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Action and User ID are required.');
    });
});