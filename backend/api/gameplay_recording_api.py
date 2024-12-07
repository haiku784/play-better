from flask import Flask, request, jsonify

app = Flask(__name__)

recordings = {}

@app.route('/recordings/start', methods=['POST'])
def start_recording():
    user_id = request.json.get('user_id')
    session_id = request.json.get('session_id')
    if user_id and session_id:
        recordings[session_id] = {'user_id': user_id, 'status': 'recording'}
        return jsonify({'message': 'Recording started', 'session_id': session_id}), 200
    return jsonify({'error': 'Invalid input'}), 400

@app.route('/recordings/stop', methods=['POST'])
def stop_recording():
    session_id = request.json.get('session_id')
    if session_id in recordings and recordings[session_id]['status'] == 'recording':
        recordings[session_id]['status'] = 'stopped'
        return jsonify({'message': 'Recording stopped', 'session_id': session_id}), 200
    return jsonify({'error': 'No active recording found for this session'}), 404

if __name__ == '__main__':
    app.run(debug=True)