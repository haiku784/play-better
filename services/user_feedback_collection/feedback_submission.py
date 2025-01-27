from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, constr
from typing import Optional
import uuid

router = APIRouter()

# Define the request model for feedback submission
class FeedbackSubmission(BaseModel):
    userId: constr(min_length=1)
    productId: constr(min_length=1)
    rating: int
    comments: Optional[str] = None

# Define the response model for feedback submission
class FeedbackResponse(BaseModel):
    status: str
    feedbackId: str

# Mock database to store feedback
feedback_db = {}

@router.post('/feedback/submit', response_model=FeedbackResponse)
async def submit_feedback(feedback: FeedbackSubmission):
    # Validate rating is between 1 and 5
    if feedback.rating < 1 or feedback.rating > 5:
        raise HTTPException(status_code=400, detail='Rating must be between 1 and 5')
    # Create a unique feedback ID
    feedback_id = str(uuid.uuid4())
    # Store feedback in the mock database
    feedback_db[feedback_id] = feedback.dict()
    return FeedbackResponse(status='success', feedbackId=feedback_id)
