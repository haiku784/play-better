# Import required libraries
from pymongo import MongoClient
from bson.json_util import dumps

class Database:
    def __init__(self, uri):
        # Initialize the MongoDB client
        self.client = MongoClient(uri)
        self.db = self.client['gameplay_db']

    def insertGameplayData(self, data):
        # Insert gameplay data into the collection
        collection = self.db['recordings']
        collection.insert_one(data)

    def getGameplayData(self, query):
        # Retrieve gameplay data based on a query
        collection = self.db['recordings']
        return dumps(collection.find(query))

    def scaleDatabase(self):
        # Perform checks and operations to scale the database horizontally
        # This function will typically include sharding logic
        pass
    
if __name__ == '__main__':
    db = Database('mongodb://localhost:27017/')
    db.insertGameplayData({'player_id': 123, 'score': 100, 'timestamp': '2023-10-01T10:00:00Z'})
    data = db.getGameplayData({'player_id': 123})
    print(data)