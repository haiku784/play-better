from pymongo import UpdateOne

# Function to perform bulk write operations
def bulk_write_operations(collection, operations):
    if not operations:
        return
    result = collection.bulk_write(operations)
    print(f"Bulk write completed: {result.bulk_api_result}")

# Example operations
operations = [
    UpdateOne({'user_id': 1}, {'$set': {'last_login': '2021-01-01'}}),
    UpdateOne({'user_id': 2}, {'$set': {'last_login': '2021-01-02'}}),
]

# Assume 'db' is our MongoDB database connection and 'users' is our collection
bulk_write_operations(db['users'], operations)