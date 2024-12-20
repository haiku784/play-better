import unittest
from api.data_ingestion import DataIngestion

class TestDataIngestion(unittest.TestCase):
    def setUp(self):
        self.data_ingester = DataIngestion()

    def test_data_format(self):
        input_data = {'key': 'value'}
        result = self.data_ingester.validate_format(input_data)
        self.assertTrue(result)

    def test_data_integration(self):
        input_data = {'key': 'value'}
        self.data_ingester.ingest(input_data)
        self.assertIn(input_data, self.data_ingester.get_data())

    def test_invalid_data(self):
        with self.assertRaises(ValueError):
            self.data_ingester.ingest(None)

if __name__ == '__main__':
    unittest.main()