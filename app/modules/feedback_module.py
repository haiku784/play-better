from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, constr
from typing import Optional, List
import uuid

app = FastAPI()

# Database simulation
mock_db = []

class Feedback(BaseModel):
    userId: constr(strict=True)
    productId: constr(strict=True)
    rating: int
    comments: Optional[str] = None

class FeedbackResponse(BaseModel):
    status: str
    feedbackId: str

class RetrieveFeedbackResponse(BaseModel):
    feedbacks: List[Feedback]

@app.post("/feedback/submit", response_model=FeedbackResponse)
async def submit_feedback(feedback: Feedback):
    # Validate rating
    if feedback.rating < 1 or feedback.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    # Generate unique feedback ID
    feedback_id = str(uuid.uuid4())
    # Save feedback to mock database
    mock_db.append({"feedbackId": feedback_id, **feedback.dict()})
    return FeedbackResponse(status="success", feedbackId=feedback_id)

@app.get("/feedback/retrieve/{productId}", response_model=RetrieveFeedbackResponse)
async def retrieve_feedback(productId: str):
    # Retrieve feedbacks for a specific product
    feedbacks = [f for f in mock_db if f['productId'] == productId]
    return RetrieveFeedbackResponse(feedbacks=feedbacks)