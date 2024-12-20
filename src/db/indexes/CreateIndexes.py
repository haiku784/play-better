from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['gameplay_db']

# Create indexes on the User Actions collection
user_actions_collection = db['user_actions']
user_actions_collection.create_index([('user_id', 1)])  # Index on user_id
user_actions_collection.create_index([('action_timestamp', 1)])  # Index on action_timestamp

# Create composite index on Gameplay Metrics collection
gameplay_metrics_collection = db['gameplay_metrics']
gameplay_metrics_collection.create_index([('game_id', 1), ('metric_type', 1), ('created_at', 1)])  # Composite index

print("Indexes created successfully.")