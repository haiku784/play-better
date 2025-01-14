from pymongo import MongoClient
from .feedback_schema import FeedbackSchema

client = MongoClient('mongodb://localhost:27017/')
database = client['feedback_db']

async def save_feedback(feedback: FeedbackSchema):
    db_feedback = database['feedback']
    db_feedback.insert_one(feedback.dict())