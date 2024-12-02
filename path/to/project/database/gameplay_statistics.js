db.createCollection('gameplay_statistics');
db.gameplay_statistics.createIndex({ sessionId: 1 });
db.gameplay_statistics.insert({ sessionId: 'abc123', insights: { /* insights data */ }, createdAt: new Date() });