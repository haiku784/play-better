import unittest

class TestAddAnnotation(unittest.TestCase):
    def test_add_annotation(self):
        # Test adding a single annotation to an item
        item = Item()
        result = item.add_annotation('Annotation text')
        self.assertTrue(result, 'Failed to add annotation')
        self.assertIn('Annotation text', item.annotations, 'Annotation not found in item')

if __name__ == '__main__':
    unittest.main()