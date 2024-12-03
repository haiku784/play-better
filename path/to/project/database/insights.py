from pymongo import MongoClient

# Connecting to MongoDB
def connect_db():
    client = MongoClient('mongodb://localhost:27017/')
    return client['gameplay_analyzer']

# Inserting insights and statistics
def insert_insights(insight_data):
    db = connect_db()
    collection = db['insights']
    result = collection.insert_one(insight_data)
    return result.inserted_id

# Retrieving insights and statistics
def retrieve_insights():
    db = connect_db()
    collection = db['insights']
    return list(collection.find({}))