import unittest

class TestAnnotationCount(unittest.TestCase):
    def test_annotation_count(self):
        # Test counting annotations of an item
        item = Item()
        item.add_annotation('Annotation 1')
        item.add_annotation('Annotation 2')
        count = item.annotation_count()
        self.assertEqual(count, 2, 'Annotation count is incorrect')

if __name__ == '__main__':
    unittest.main()