const request = require('supertest');
const app = require('../server');

describe('POST /api/metrics', () => {
    it('should submit gameplay metrics successfully', async () => {
        const response = await request(app)
            .post('/api/metrics')
            .send({ userId: 'user123', performanceData: { score: 100, level: 5 } });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Metrics submitted successfully.');
    });

    it('should return error for missing userId', async () => {
        const response = await request(app)
            .post('/api/metrics')
            .send({ performanceData: { score: 100, level: 5 } });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User ID and performance data are required.');
    });
});