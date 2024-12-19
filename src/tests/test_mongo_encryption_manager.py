import unittest
from mongo_encryption_manager import MongoDBConnector

class TestMongoDBConnector(unittest.TestCase):
    def setUp(self):
        # Setup method to initialize parameters
        self.valid_uri = 'mongodb://localhost:27017'
        self.invalid_uri = 'mongodb://invalid_uri'
        self.ssl_certfile = '/path/to/certfile.pem'

    def test_connect_valid_uri(self):
        # Test connection with a valid URI
        connector = MongoDBConnector(self.valid_uri, self.ssl_certfile)
        db = connector.get_database('test_db')
        self.assertIsNotNone(db)

    def test_connect_invalid_uri(self):
        # Test connection with an invalid URI
        with self.assertRaises(Exception):
            MongoDBConnector(self.invalid_uri, self.ssl_certfile)

if __name__ == '__main__':
    unittest.main()