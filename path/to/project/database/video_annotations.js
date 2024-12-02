db.createCollection('video_annotations');
db.video_annotations.createIndex({ sessionId: 1 });
db.video_annotations.insert({ sessionId: 'abc123', annotations: [{ time: 120, comment: 'Great play!', userId: 'user123' }], createdAt: new Date() });