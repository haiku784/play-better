from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['game_db']

# Migration script to update the MongoDB schema
result = db.gaming_preferences.update_many({}, {"$set": {"performance_metrics": {}}})
print(f'{result.modified_count} documents updated.')