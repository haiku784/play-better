import pymongo

# Establish connection to MongoDB
def connect_to_mongo(uri):
    client = pymongo.MongoClient(uri)
    return client

# Validate schema function checks if schema conditions are met
# Expected schema can be defined in a separate function or object

def validate_schema(db, collection_name, expected_schema):
    collection = db[collection_name]
    # Sample data retrieval for validation
    sample_data = collection.find().limit(10)
    for data in sample_data:
        for field, expected_type in expected_schema.items():
            if field not in data:
                print(f"Missing field: {field}")
            elif not isinstance(data[field], expected_type):
                print(f"Field '{field}' in document {data} is not of type {expected_type.__name__}")
    print('Schema validation complete.')  
    
# Example usage function
def main():
    uri = "mongodb://localhost:27017/"
    client = connect_to_mongo(uri)
    db = client['my_database']
    expected_schema = {
        'name': str,
        'age': int,
        'email': str
    }
    validate_schema(db, 'my_collection', expected_schema)

if __name__ == '__main__':
    main()