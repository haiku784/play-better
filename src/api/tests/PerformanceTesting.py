import time
import random
from pymongo import MongoClient

# Function to perform performance testing for bulk write operations
def performance_test_bulk_write():
    client = MongoClient('mongodb://localhost:27017/')
    db = client['gameplay_db']
    collection = db['gameplay_data']

    # Create sample data for bulk write
    operations = [{'user_id': random.randint(1, 1000), 'score': random.randint(1, 100)} for _ in range(10000)]

    # Measure time taken for bulk insert
    start_time = time.time()
    collection.insert_many(operations)
    end_time = time.time()

    print(f"Bulk insert completed in {(end_time - start_time):.2f} seconds.")

if __name__ == '__main__':
    performance_test_bulk_write()