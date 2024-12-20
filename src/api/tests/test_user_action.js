const request = require('supertest');
const app = require('../server');

describe('POST /user_action', () => {
    it('should record a user action', async () => {
        const response = await request(app)
            .post('/user_action')
            .send({ action: 'test action', userId: 1 });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User action recorded.');
    });

    it('should return 400 for missing action', async () => {
        const response = await request(app)
            .post('/user_action')
            .send({ userId: 1 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Action is required.');
    });
});