import unittest

class TestRetrieveAnnotations(unittest.TestCase):
    def test_retrieve_annotations(self):
        # Test retrieving annotations from an item
        item = Item()
        item.add_annotation('First annotation')
        item.add_annotation('Second annotation')
        annotations = item.get_annotations()
        self.assertEqual(len(annotations), 2, 'Incorrect number of annotations retrieved')
        self.assertIn('First annotation', annotations, 'First annotation not found')
        self.assertIn('Second annotation', annotations, 'Second annotation not found')

if __name__ == '__main__':
    unittest.main()