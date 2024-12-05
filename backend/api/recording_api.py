from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['gameplay_db']

@app.route('/recording', methods=['POST'])
def store_recording():
    user_id = request.json.get('user_id')
    recording_data = request.json.get('recording_data')

    if not user_id or not recording_data:
        return jsonify({'error': 'User ID and recording data are required!'}), 400

    recording_id = db.recordings.insert_one({
        'user_id': user_id,
        'recording_data': recording_data
    }).inserted_id

    return jsonify({'message': 'Recording stored successfully!', 'recording_id': str(recording_id)}), 201

if __name__ == '__main__':
    app.run(debug=True)