import pymongo
from datetime import datetime, timedelta

# Connect to MongoDB
def connect_to_mongo(uri):
    client = pymongo.MongoClient(uri)
    return client

# Function to validate retention policy for documents

def validate_retention_policy(db, collection_name, retention_period_days):
    collection = db[collection_name]
    current_time = datetime.now()
    # Calculate time threshold based on retention period
    retention_threshold = current_time - timedelta(days=retention_period_days)
    # Find documents older than the retention threshold
    outdated_docs = collection.find({"created_at": {"$lt": retention_threshold}})
    for doc in outdated_docs:
        print(f"Document {doc['_id']} exceeds retention policy.")
    print('Retention policy validation complete.')  

# Example usage function
def main():
    uri = "mongodb://localhost:27017/"
    client = connect_to_mongo(uri)
    db = client['my_database']
    retention_period_days = 30 # Example retention period
    validate_retention_policy(db, 'my_collection', retention_period_days)

if __name__ == '__main__':
    main()