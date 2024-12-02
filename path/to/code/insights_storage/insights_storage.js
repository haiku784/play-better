db.createCollection('gameplay_insights');

db.gameplay_insights.insertMany([
    { playerId: 'player1', game: 'Game A', insights: { kills: 10, deaths: 5, assists: 2 } },
    { playerId: 'player2', game: 'Game B', insights: { kills: 8, deaths: 3, assists: 4 } }
]);

function getInsights(playerId, game) {
    return db.gameplay_insights.findOne({ playerId: playerId, game: game });
}