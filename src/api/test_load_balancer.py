import unittest
from load_balancer import LoadBalancer

class TestLoadBalancer(unittest.TestCase):
    def test_get_server(self):
        lb = LoadBalancer(['Server1', 'Server2', 'Server3'])
        server = lb.get_server()
        self.assertIn(server, ['Server1', 'Server2', 'Server3'], "Selected server should be in the list of servers.")

    def test_distribute_request(self):
        lb = LoadBalancer(['Server1', 'Server2', 'Server3'])
        server = lb.distribute_request()  # This will print the selected server
        self.assertIn(server, ['Server1', 'Server2', 'Server3'], "Distributed server should be one of the available servers.")

if __name__ == '__main__':
    unittest.main()