from pymongo import MongoClient, UpdateOne

# Database setup
client = MongoClient("mongodb://localhost:27017/")
db = client['gameplay_db']

# Migration to update the gameplay session schema
session_updates = db.sessions.update_many({}, [
    {"$set": {
        "kill_death_ratio": 0.0,
        "completion_rate": 0.0,
        "movement_patterns": []
    }}
}])

print(f"Updated {session_updates.modified_count} session documents to include performance metrics fields.")