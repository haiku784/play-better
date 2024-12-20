import unittest
from horizontal_scaling import HorizontalScaling

class TestHorizontalScaling(unittest.TestCase):
    def setUp(self):
        self.scaling = HorizontalScaling('AI Engine', 3)

    def test_initialization(self):
        self.assertEqual(self.scaling.service_name, 'AI Engine')
        self.assertEqual(self.scaling.instances, 3)

    def test_configure_load_balancer(self):
        self.scaling.configure_load_balancer('nginx')
        self.assertEqual(self.scaling.load_balancer, 'nginx')

    def test_scale_up(self):
        self.scaling.scale_up(2)
        self.assertEqual(self.scaling.instances, 5)

    def test_scale_down(self):
        self.scaling.scale_down(1)
        self.assertEqual(self.scaling.instances, 2)

    def test_scale_down_beyond_zero(self):
        self.scaling.scale_down(5)
        self.assertEqual(self.scaling.instances, 3)  # Should not go below initial value

if __name__ == '__main__':
    unittest.main()