import random

class LoadBalancer:
    def __init__(self, service_instances):
        self.service_instances = service_instances

    def get_service(self):
        # Randomly selects a service instance for load distribution
        return random.choice(self.service_instances)
