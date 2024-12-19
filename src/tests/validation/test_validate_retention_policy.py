import unittest
from validate_retention_policy import validate_retention_policy
from datetime import datetime, timedelta

class TestRetentionPolicyValidation(unittest.TestCase):
    def test_validate_retention_policy(self):
        # Create a mock database and collection for testing
        uri = "mongodb://localhost:27017/"
        client = connect_to_mongo(uri)
        db = client['test_database']
        # Insert mock data with created_at field
        past_date = datetime.now() - timedelta(days=31)
        db['test_collection'].insert_many([
            {'name': 'Old Doc', 'created_at': past_date},
            {'name': 'Recent Doc', 'created_at': datetime.now()}
        ])
        # Capture the output of validate_retention_policy
        with self.assertLogs(level='ERROR') as log:
            validate_retention_policy(db, 'test_collection', 30)
        self.assertIn("Document {'_id': ObjectId('...')} exceeds retention policy.", log.output[0])

if __name__ == '__main__':
    unittest.main()