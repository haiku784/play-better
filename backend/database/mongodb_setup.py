from pymongo import MongoClient

class MongoDB:
    def __init__(self, uri='mongodb://localhost:27017/'):
        self.client = MongoClient(uri)
        self.db = self.client['gameplay_db']

    def get_collection(self, collection_name):
        return self.db[collection_name]

# Example usage
if __name__ == '__main__':
    mongo = MongoDB()
    users_collection = mongo.get_collection('users')
    # Now you can perform CRUD operations on the users collection