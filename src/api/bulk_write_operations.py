from pymongo import MongoClient, InsertOne, UpdateOne

class BulkWriteOperations:
    def __init__(self, db_name, collection_name):
        # Initialize MongoDB client and specify the database and collection
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def bulk_insert(self, records):
        # Perform bulk insert operation
        operations = [InsertOne(record) for record in records]
        result = self.collection.bulk_write(operations)
        return result.inserted_count

    def bulk_update(self, updates):
        # Perform bulk update operations
        operations = [UpdateOne({'_id': update['_id']}, {'$set': update['data']}) for update in updates]
        result = self.collection.bulk_write(operations)
        return result.modified_count

    def close(self):
        # Close the MongoDB connection
        self.client.close()