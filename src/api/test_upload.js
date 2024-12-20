const request = require('supertest');
const app = require('../server'); // Import the server setup

describe('POST /api/upload', () => {
    it('should upload a video file successfully', async () => {
        const response = await request(app)
            .post('/api/upload')
            .attach('video', 'test/video.mp4'); // Make sure to have a test video in your test folder
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Video uploaded successfully!');
    });

    it('should return error for invalid file type', async () => {
        const response = await request(app)
            .post('/api/upload')
            .attach('video', 'test/image.png'); // Testing with an invalid file type
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Error: Video files only!');
    });
});