from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, constr
from typing import List, Dict

router = APIRouter()

# Define the request model for feedback retrieval
class FeedbackRetrievalRequest(BaseModel):
    productId: constr(min_length=1)

# Define the response model for feedback retrieval
class Feedback(BaseModel):
    userId: str
    productId: str
    rating: int
    comments: Optional[str] = None

class FeedbackRetrievalResponse(BaseModel):
    feedbacks: List[Feedback]

# Mock database for feedback
feedback_db = {}  # Assume this holds previously submitted feedback

@router.get('/feedback/retrieve', response_model=FeedbackRetrievalResponse)
async def retrieve_feedback(request: FeedbackRetrievalRequest):
    # Retrieve feedback from the mock database
    feedbacks = [fb for fb in feedback_db.values() if fb['productId'] == request.productId]
    if not feedbacks:
        raise HTTPException(status_code=404, detail='No feedback found for this product')
    # Map the feedback to the response model
    feedback_list = [Feedback(**fb) for fb in feedbacks]
    return FeedbackRetrievalResponse(feedbacks=feedback_list)
