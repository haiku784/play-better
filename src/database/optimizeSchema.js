use gameplayDB;

// Example of optimizing a collection
const optimizeSchema = () => {
    db.recordings.createIndex({ userId: 1, timestamp: -1 });
};

optimizeSchema();