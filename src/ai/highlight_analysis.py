from pymongo import MongoClient
from bson.objectid import ObjectId

class HighlightAnalysis:
    def __init__(self, db_url: str):
        self.client = MongoClient(db_url)
        self.db = self.client['gameplay_db']
        self.highlights_collection = self.db['highlights']

    def save_highlight(self, user_id: str, session_id: str, highlight_data: dict):
        # Save highlight to the database
        highlight = {
            'user_id': user_id,
            'session_id': session_id,
            'data': highlight_data,
            'timestamp': datetime.datetime.now()
        }
        self.highlights_collection.insert_one(highlight)

    def retrieve_highlights(self, user_id: str, session_id: str):
        # Retrieve highlights from the database
        return list(self.highlights_collection.find({'user_id': user_id, 'session_id': session_id}))