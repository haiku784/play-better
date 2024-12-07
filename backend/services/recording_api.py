from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/game_analysis'
mongo = PyMongo(app)

@app.route('/api/recordings', methods=['POST'])
def upload_recording():
    user_id = request.json.get('user_id')
    recording_data = request.json.get('recording_data')
    if not user_id or not recording_data:
        return jsonify({'error': 'User ID and recording data are required'}), 400
    mongo.db.recordings.insert_one({'user_id': user_id, 'recording_data': recording_data})
    return jsonify({'message': 'Recording uploaded successfully'}), 201

@app.route('/api/recordings/<user_id>', methods=['GET'])
def get_recordings(user_id):
    recordings = mongo.db.recordings.find({'user_id': user_id})
    return jsonify([recording for recording in recordings]), 200

if __name__ == '__main__':
    app.run(debug=True)