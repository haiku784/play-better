from pymongo import MongoClient

def initialize_db(db_uri: str, db_name: str):
    client = MongoClient(db_uri)
    db = client[db_name]
    db.create_collection('recommendations')
    db.recommendations.create_index([('user_id', 1)])

    # Sample document structure
    sample_doc = {
        'user_id': '',  # User identifier
        'gear_ids': [],  # List of gear recommendations
        'timestamp': ''  # Time of recommendation
    }
    db.recommendations.insert_one(sample_doc)  # Placeholder insertion