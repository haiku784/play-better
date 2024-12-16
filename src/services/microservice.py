class Microservice:
    """
    A class representing a microservice with methods for selecting a communication protocol.
    """
    def __init__(self, name):
        self.name = name
        self.protocol = None

    def select_protocol(self, protocol_type):
        """Selects a communication protocol for the microservice."""
        if protocol_type not in ['REST', 'gRPC', 'GraphQL']:
            raise ValueError("Invalid protocol type. Choose from 'REST', 'gRPC', or 'GraphQL'.")
        self.protocol = protocol_type
        return f"{self.name} is using {self.protocol} protocol."

    def get_details(self):
        """Returns the details of the microservice including its protocol."""
        return f"Microservice: {self.name}, Protocol: {self.protocol if self.protocol else 'Not selected'}"

# Example usage:
if __name__ == '__main__':
    service1 = Microservice('User Service')
    print(service1.select_protocol('REST'))
    print(service1.get_details())
    
    service2 = Microservice('Order Service')
    print(service2.select_protocol('gRPC'))
    print(service2.get_details())