import time
import pymongo
from pymongo import MongoClient

# Function to insert a large number of records into the MongoDB database
def insert_records(db, collection, num_records):
    records = [{"data": f"Record {i}"} for i in range(num_records)]
    start_time = time.time()
    collection.insert_many(records)
    end_time = time.time()
    print(f"Inserted {num_records} records in {end_time - start_time} seconds")

# Function to test the performance of the database with given number of records
def performance_test(db_name, collection_name, num_records):
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client[db_name]
    collection = db[collection_name]

    # Run the performance test
    insert_records(db, collection, num_records)

# Main function to execute the test
if __name__ == "__main__":
    performance_test("performance_test_db", "records", 10000000)  # Testing with 10 million records