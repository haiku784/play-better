import unittest
from bulk_write_operations import BulkWriteOperations

class TestBulkWriteOperations(unittest.TestCase):
    def setUp(self):
        # Setup for test cases
        self.bulk_operations = BulkWriteOperations('test_db', 'test_collection')

    def test_bulk_insert(self):
        # Test for bulk insert operation
        records = [{'_id': 1, 'name': 'Test1'}, {'_id': 2, 'name': 'Test2'}]
        inserted_count = self.bulk_operations.bulk_insert(records)
        self.assertEqual(inserted_count, 2)

    def test_bulk_update(self):
        # Insert records for testing update
        self.bulk_operations.bulk_insert([{ '_id': 1, 'name': 'Test1'}, {'_id': 2, 'name': 'Test2'}])
        updates = [{ '_id': 1, 'data': {'name': 'Updated Test1'}}, {'_id': 2, 'data': {'name': 'Updated Test2'}}]
        modified_count = self.bulk_operations.bulk_update(updates)
        self.assertEqual(modified_count, 2)

    def tearDown(self):
        # Cleanup the database after tests
        self.bulk_operations.collection.delete_many({})
        self.bulk_operations.close()

if __name__ == '__main__':
    unittest.main()