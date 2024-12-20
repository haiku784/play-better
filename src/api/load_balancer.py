import random

class LoadBalancer:
    def __init__(self, servers):
        """Initialize the load balancer with a list of servers."""
        self.servers = servers

    def get_server(self):
        """Return a server selected at random from the list of servers."""
        return random.choice(self.servers)

    def distribute_request(self):
        """Distribute a request by returning a server to handle it."""
        selected_server = self.get_server()
        print(f"Request directed to server: {selected_server}")
        return selected_server

# Example instantiation and usage:
# lb = LoadBalancer(['Server1', 'Server2', 'Server3'])
# lb.distribute_request()