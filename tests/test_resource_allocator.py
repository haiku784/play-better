import unittest
from resource_allocator import ResourceAllocator

class TestResourceAllocator(unittest.TestCase):
    def setUp(self):
        self allocator = ResourceAllocator()

    def test_allocate_resource(self):
        self.allocator.allocate_resource('recorder1', 5)
        self.assertEqual(self.allocator.get_allocated_resources(), {'recorder1': 5})

    def test_deallocate_resource(self):
        self.allocator.allocate_resource('recorder1', 5)
        self.allocator.deallocate_resource('recorder1', 3)
        self.assertEqual(self.allocator.get_allocated_resources(), {'recorder1': 2})

    def test_deallocate_exceeds_allocated(self):
        self.allocator.allocate_resource('recorder1', 2)
        with self.assertRaises(ValueError):
            self.allocator.deallocate_resource('recorder1', 3)

if __name__ == '__main__':
    unittest.main()