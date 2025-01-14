from pymongo import MongoClient

class FeedbackDatabase:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017')
        self.db = self.client['feedback_db']
        self.feedback_collection = self.db['feedback_collection']
        self.feedback_analysis_collection = self.db['feedback_analysis_collection']

    def save_feedback(self, feedback):
        return self.feedback_collection.insert_one(feedback)

    def get_feedback_by_user(self, user_id):
        return list(self.feedback_collection.find({'user_id': user_id}))

    def save_feedback_analysis(self, analysis):
        return self.feedback_analysis_collection.insert_one(analysis)

    def get_feedback_analysis(self, user_id, gear_id):
        return self.feedback_analysis_collection.find_one({'user_id': user_id, 'gear_id': gear_id})