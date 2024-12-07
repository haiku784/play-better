# Example function to configure sharding in MongoDB
from pymongo import MongoClient

# Connect to the MongoDB server
client = MongoClient('mongodb://localhost:27017/')

def enableSharding(db_name):
    # Enable sharding on the specified database
    client.admin.command('enableSharding', db_name)
    print(f'Sharding enabled on database: {db_name}')

if __name__ == '__main__':
    enableSharding('gameplay_db')