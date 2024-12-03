db.createCollection('gear_recommendations');
db.gear_recommendations.insert({ userId: '12345', gearList: ['Headset A', 'Mouse B'], createdAt: new Date() });