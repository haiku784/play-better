const request = require('supertest');
const app = require('../app'); // Import the Express app

describe('Authentication Service Integration Tests', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register') // Endpoint for user registration
      .send({ username: 'newUser', password: 'newPass' });

    expect(response.status).toBe(201); // Ensure registration was successful
    expect(response.body).toHaveProperty('id'); // Ensure response contains ID
  });

  it('should login user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/login') // Endpoint for user login
      .send({ username: 'newUser', password: 'newPass' });

    expect(response.status).toBe(200); // Ensure login was successful
    expect(response.body).toHaveProperty('token'); // Ensure response contains a token
  });
});
