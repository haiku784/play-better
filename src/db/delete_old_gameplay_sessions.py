import json
import datetime
import os
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['gameplay_db']

# Define retention period
RETENTION_PERIOD = 12  # months

# Function to delete old gameplay sessions

def delete_old_sessions():
    expiration_date = datetime.datetime.now() - datetime.timedelta(days=RETENTION_PERIOD * 30)
    result = db.gameplay_sessions.delete_many({"timestamp": {"$lt": expiration_date}})
    print(f"Deleted {result.deleted_count} old gameplay sessions.")

# Entry point
if __name__ == '__main__':
    delete_old_sessions()