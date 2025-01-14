from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class FeedbackAnalysis(BaseModel):
    user_id: str
    gear_id: str
    aggregated_ratings: float
    insights: str

@router.post('/feedback-analysis')
async def save_feedback_analysis(analysis: FeedbackAnalysis):
    # Store analysis in MongoDB (logic to connect to DB and save omitted for brevity)
    # Example: await db.feedback_analysis.insert_one(analysis.dict())
    # Return success message
    return {"message": "Feedback analysis saved successfully"}

@router.get('/feedback-analysis/{user_id}', response_model=List[FeedbackAnalysis])
async def get_feedback_analysis(user_id: str):
    # Fetch analysis from MongoDB (logic to connect to DB and retrieve omitted for brevity)
    # Example: analysis = await db.feedback_analysis.find({"user_id": user_id}).to_list()
    return analysis