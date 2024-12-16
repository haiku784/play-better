class Microservice {
    constructor(name) {
        this.name = name;
        this.protocol = null;
    }

    selectProtocol(protocolType) {
        if (!['REST', 'gRPC', 'GraphQL'].includes(protocolType)) {
            throw new Error("Invalid protocol type. Choose from 'REST', 'gRPC', or 'GraphQL'.");
        }
        this.protocol = protocolType;
        return `${this.name} is using ${this.protocol} protocol.`;
    }

    getDetails() {
        return `Microservice: ${this.name}, Protocol: ${this.protocol ? this.protocol : 'Not selected'}`;
    }
}

// Example usage:
const service1 = new Microservice('User Service');
console.log(service1.selectProtocol('REST'));
console.log(service1.getDetails());

const service2 = new Microservice('Order Service');
console.log(service2.selectProtocol('gRPC'));
console.log(service2.getDetails());