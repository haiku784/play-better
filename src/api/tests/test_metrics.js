const request = require('supertest');
const app = require('../server');

describe('POST /metrics', () => {
    it('should submit gameplay metrics', async () => {
        const response = await request(app)
            .post('/metrics')
            .send({ score: 100, level: 5 });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Metrics submitted successfully.');
    });

    it('should return 400 for missing score', async () => {
        const response = await request(app)
            .post('/metrics')
            .send({ level: 5 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Score is required.');
    });
});