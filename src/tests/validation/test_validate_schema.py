import unittest
from validate_schema import validate_schema

class TestSchemaValidation(unittest.TestCase):
    def test_validate_schema(self):
        # Create a mock database and collection for testing
        uri = "mongodb://localhost:27017/"
        client = connect_to_mongo(uri)
        db = client['test_database']
        expected_schema = {
            'name': str,
            'age': int,
            'email': str
        }
        # Insert mock data
        db['test_collection'].insert_many([
            {'name': 'John', 'age': 30, 'email': 'john@example.com'},
            {'name': 'Jane', 'age': 'not_a_number', 'email': 'jane@example.com'}
        ])
        # Capture the output of validate_schema
        with self.assertLogs(level='ERROR') as log:
            validate_schema(db, 'test_collection', expected_schema)
        self.assertIn("Field 'age' in document {'name': 'Jane', 'age': 'not_a_number', 'email': 'jane@example.com'} is not of type int", log.output[0])

if __name__ == '__main__':
    unittest.main()