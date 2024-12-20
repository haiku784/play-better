const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const createIndexes = async () => {
    const MyModel = mongoose.model('MyModel', new mongoose.Schema({
        field1: String,
        field2: Number,
        field3: Date,
    }));

    try {
        await MyModel.createIndexes({
            field1: 1, // Index on field1 to optimize queries
            field2: -1, // Index on field2 (descending) for sorting
        });
        console.log('Indexes created successfully');
    } catch (error) {
        console.error('Error creating indexes:', error);
    }
};

const run = async () => {
    await connectToDB();
    await createIndexes();
    mongoose.connection.close();
};

run();