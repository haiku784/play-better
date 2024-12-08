const request = require('supertest');
const app = require('../app'); // Import the Express app

describe('Recording Service Integration Tests', () => {
  it('should authenticate user and record data successfully', async () => {
    const authResponse = await request(app)
      .post('/api/auth/login') // Authenticate user
      .send({ username: 'testUser', password: 'testPass' });

    expect(authResponse.status).toBe(200); // Check that authentication was successful

    const recordResponse = await request(app)
      .post('/api/record') // Endpoint for recording
      .set('Authorization', `Bearer ${authResponse.body.token}`) // Set the bearer token
      .send({ data: 'example recording data' });

    expect(recordResponse.status).toBe(201); // Check that recording was successful
    expect(recordResponse.body).toHaveProperty('id'); // Ensure response has an ID
  });
});
