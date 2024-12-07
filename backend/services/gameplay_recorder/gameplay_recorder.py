from flask import Flask, request, jsonify
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.route('/record', methods=['POST'])
def record_gameplay():
    data = request.json
    # Process gameplay data (placeholder for real processing logic)
    logging.info('Recording gameplay data: %s', data)
    return jsonify({'status': 'success'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    # Serve the microservice on port 5000