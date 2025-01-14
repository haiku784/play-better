from pymongo import MongoClient
from .feedback_analysis_schema import FeedbackAnalysisSchema

client = MongoClient("mongodb://localhost:27017/")
db = client['gameplay_database']
feedback_analysis_collection = db['feedback_analysis']

async def save_feedback_analysis(data: FeedbackAnalysisSchema):
    result = feedback_analysis_collection.insert_one(data.dict())
    return data

async def get_feedback_analysis(user_id: Optional[str], gear_id: Optional[str]):
    query = {}
    if user_id:
        query['user_id'] = user_id
    if gear_id:
        query['gear_id'] = gear_id
    return list(feedback_analysis_collection.find(query))
