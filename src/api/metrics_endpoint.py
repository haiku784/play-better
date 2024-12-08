from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data, in practice, this would come from a database or external service
metrics_data = [{
    'timestamp': '2023-10-01T12:00:00Z',
    'metric_name': 'CPU Usage',
    'value': 75
}, {
    'timestamp': '2023-10-01T12:05:00Z',
    'metric_name': 'Memory Usage',
    'value': 60
}]

@app.route('/metrics/latest', methods=['GET'])
def get_latest_metrics():
    # Retrieve the latest metrics data
    latest_metrics = metrics_data[-1]  # Get last entry as latest
    return jsonify(latest_metrics), 200

if __name__ == '__main__':
    # Run the Flask web application
    app.run(debug=True)