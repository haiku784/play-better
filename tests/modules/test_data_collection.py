import unittest
from data_collection import DataCollector

class TestDataCollectionModule(unittest.TestCase):
    def setUp(self):
        # Initialize the DataCollector class before each test
        self.collector = DataCollector()  
    
    def test_data_collection(self):
        # Test if data collection returns the expected format
        data = self.collector.collect_data()
        self.assertIsInstance(data, dict, "Data should be a dictionary")
        self.assertIn('data', data, "Data should contain the key 'data'")

    def test_data_collection_empty(self):
        # Test that no data is collected in the absence of sources
        self.collector.sources = []  # No sources
        data = self.collector.collect_data()
        self.assertEqual(data, {}, "Data should be empty if no sources are provided")

if __name__ == '__main__':
    unittest.main()