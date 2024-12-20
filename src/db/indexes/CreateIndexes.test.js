const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const CreateIndexes = require('./CreateIndexes');

describe('CreateIndexes', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    test('should create indexes successfully', async () => {
        await CreateIndexes();
        const indexes = await mongoose.connection.db.collection('mymodels').indexInformation();
        expect(indexes).toHaveProperty('field1_1');
        expect(indexes).toHaveProperty('field2_-1');
    });
});