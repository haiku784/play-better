// Enable sharding on a specific collection in MongoDB
use gameplay_db;

sh.enableSharding('gameplay_db');
sh.shardCollection('gameplay_db.recordings', { player_id: 1 });

// Verify that sharding is enabled
db.runCommand({'listShards': 1});