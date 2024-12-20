const request = require('supertest');
const app = require('../server');

describe('POST /upload', () => {
    it('should upload a valid video file', async () => {
        const response = await request(app)
            .post('/upload')
            .attach('file', 'path/to/valid/video.mp4'); // replace with a real file path
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('File uploaded successfully.');
    });

    it('should return 400 for invalid file type', async () => {
        const response = await request(app)
            .post('/upload')
            .attach('file', 'path/to/invalid/file.txt'); // replace with a real file path
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid file type.');
    });
});