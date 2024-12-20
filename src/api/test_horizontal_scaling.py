import unittest
from horizontal_scaling import HorizontalScaling

class TestHorizontalScaling(unittest.TestCase):
    def setUp(self):
        self.scaling = HorizontalScaling(1, 5)

    def test_scale_up(self):
        self.scaling.scale_up()
        self.assertEqual(self.scaling.current_instances, 2)

    def test_scale_down(self):
        self.scaling.scale_up()  # Increase to 2
        self.scaling.scale_down()
        self.assertEqual(self.scaling.current_instances, 1)

    def test_max_instances(self):
        for _ in range(5):
            self.scaling.scale_up()
        self.assertEqual(self.scaling.current_instances, 5)  # Should not exceed max

if __name__ == '__main__':
    unittest.main()