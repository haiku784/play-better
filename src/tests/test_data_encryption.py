import unittest
from gameplay_data_encryption import DataInTransitEncryption
from data_at_rest_encryption import DataAtRestEncryption

class TestDataEncryption(unittest.TestCase):
    def setUp(self):
        # Setup for DataInTransitEncryption
        self.transit_encryption = DataInTransitEncryption()
        # Setup for DataAtRestEncryption
        self.at_rest_encryption = DataAtRestEncryption('mongodb://localhost:27017/', 'test_db')

    def test_in_transit_encryption(self):
        data = "Test Data"
        encrypted_data = self.transit_encryption.encrypt_data(data)
        decrypted_data = self.transit_encryption.decrypt_data(encrypted_data)
        self.assertEqual(data, decrypted_data, "Decrypted data should match original data.")

    def test_at_rest_encryption(self):
        data = "Test Data At Rest"
        self.at_rest_encryption.store_data('test_collection', data)
        retrieved_data = self.at_rest_encryption.retrieve_data('test_collection')
        self.assertIn(data, retrieved_data, "Stored data should be retrievable.")

if __name__ == '__main__':
    unittest.main()