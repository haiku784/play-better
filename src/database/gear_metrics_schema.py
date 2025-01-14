from pymongo import MongoClient
from bson.objectid import ObjectId

# MongoDB client initialization
client = MongoClient('mongodb://localhost:27017/')

db = client['gameplay']  # database name

# Gear metrics schema definition
gear_metrics_schema = {
    '_id': ObjectId,
    'gear_option_id': str,  # ID of the gear option
    'user_id': str,  # ID of the user
    'metrics': {
        'price': float,  # price of the gear
        'features': list,  # list of features
        'user_ratings': float  # user ratings
    },
    'timestamp': {'$type': 'Date'}  # timestamp of the record
}

# Function to insert a gear metric into MongoDB
def insert_gear_metric(gear_option_id, user_id, price, features, user_ratings):
    metrics = {
        'gear_option_id': gear_option_id,
        'user_id': user_id,
        'metrics': {
            'price': price,
            'features': features,
            'user_ratings': user_ratings
        },
        'timestamp': datetime.datetime.now()
    }
    db.gear_metrics.insert_one(metrics)
    return metrics
