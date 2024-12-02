db.createCollection('gameplay_sessions');
db.gameplay_sessions.createIndex({ userId: 1 });
db.gameplay_sessions.insert({ userId: '12345', gameTitle: 'Game X', sessionData: { /* session details */ }, createdAt: new Date() });