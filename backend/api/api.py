from flask import Flask, jsonify, request
import multiprocessing

app = Flask(__name__)

# Endpoint for health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify(status='healthy'), 200

# Sample endpoint to handle user requests
@app.route('/user/request', methods=['POST'])
def user_request():
    data = request.json
    # Perform logic here (e.g., processing user data)
    response = {'message': 'Request received', 'data': data}
    return jsonify(response), 200

if __name__ == '__main__':
    # Use multiprocessing for handling multiple connections
    app.run(host='0.0.0.0', port=5000, threaded=True)