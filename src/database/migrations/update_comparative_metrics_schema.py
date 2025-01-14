from pymongo import MongoClient

# MongoDB connection setup
client = MongoClient("mongodb://localhost:27017/")
db = client["gameplay_metrics"]

# Updating the schema to include fields for comparative metrics
db.configurations.update_many({},{'$set': {
    'kill_death_ratio': 0.0,
    'completion_rate': 0.0,
    'movement_patterns': []
}})