const request = require('supertest');
const app = require('../server');
const User = require('../models/user.model');

describe('Authentication API', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await User.deleteMany({});
    });

    it('should authenticate user and return a token', async () => {
        // Create a user
        const user = new User({ username: 'testuser', password: 'password' });
        await user.save();

        // Attempt to authenticate
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'password' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
    });
});