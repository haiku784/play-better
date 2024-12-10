import unittest
from data_preprocessing import DataPreprocessor

class TestDataPreprocessingModule(unittest.TestCase):
    def setUp(self):
        # Initialize the DataPreprocessor class before each test
        self.preprocessor = DataPreprocessor()
    
    def test_preprocess_data(self):
        # Test if the preprocessing function returns cleaned data
        raw_data = {'data': [1, 2, None, 4]}
        cleaned_data = self.preprocessor.preprocess(raw_data)
        self.assertEqual(cleaned_data, [1, 2, 4], "Data should remove None values")

    def test_preprocess_invalid_data(self):
        # Test preprocessing with invalid input
        with self.assertRaises(ValueError):
            self.preprocessor.preprocess(None)

if __name__ == '__main__':
    unittest.main()