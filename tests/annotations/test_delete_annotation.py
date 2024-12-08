import unittest

class TestDeleteAnnotation(unittest.TestCase):
    def test_delete_annotation(self):
        # Test deleting an existing annotation from an item
        item = Item()
        item.add_annotation('Test Annotation')
        result = item.delete_annotation('Test Annotation')
        self.assertTrue(result, 'Failed to delete annotation')
        self.assertNotIn('Test Annotation', item.annotations, 'Annotation was not deleted')

if __name__ == '__main__':
    unittest.main()