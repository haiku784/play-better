import unittest
from load_balancer import LoadBalancer

class TestLoadBalancer(unittest.TestCase):
    def setUp(self):
        self.lb = LoadBalancer(['service1', 'service2', 'service3'])

    def test_get_service(self):
        services = [self.lb.get_service() for _ in range(6)]  # Call get_service 6 times
        self.assertEqual(services, ['service1', 'service2', 'service3', 'service1', 'service2', 'service3'])

if __name__ == '__main__':
    unittest.main()