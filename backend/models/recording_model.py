from pymongo import MongoClient

class Recording:
    def __init__(self, user_id, recording_data):
        self.user_id = user_id
        self.recording_data = recording_data

    @staticmethod
    def save_recording(user_id, recording_data):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['gameplay_db']
        return db.recordings.insert_one({
            'user_id': user_id,
            'recording_data': recording_data
        }).inserted_id

    @staticmethod
    def get_recordings_by_user(user_id):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['gameplay_db']
        return list(db.recordings.find({'user_id': user_id}))