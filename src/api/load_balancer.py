import os

class LoadBalancer:
    def __init__(self, services):
        self.services = services  # List of available services
        self.current_index = 0

    def get_service(self):
        # Round-robin load balancing
        service = self.services[self.current_index]
        self.current_index = (self.current_index + 1) % len(self.services)
        return service

# Example usage:
# services = ['service1:port', 'service2:port', 'service3:port']
# lb = LoadBalancer(services)
# print(lb.get_service())  # This will return the next service to handle the request.