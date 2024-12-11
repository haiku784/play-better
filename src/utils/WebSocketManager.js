// WebSocketManager.js

class WebSocketManager {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.listeners = [];
    }

    // Method to initialize WebSocket connection
    init() {
        this.socket = new WebSocket(this.url);

        // Listen for messages from the server
        this.socket.onmessage = (event) => {
            this.notifyListeners(JSON.parse(event.data));
        };

        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };
    }

    // Method to add listeners for updates
    addListener(listener) {
        this.listeners.push(listener);
    }

    // Notify all listeners with the new data
    notifyListeners(data) {
        this.listeners.forEach(listener => listener(data));
    }
}

export default WebSocketManager;