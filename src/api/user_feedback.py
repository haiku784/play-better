from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

# Define the Pydantic schema for User Feedback
class UserFeedback(BaseModel):
    user_id: int
    practice_routine_id: int
    feedback: str

# Initialize the FastAPI router
router = APIRouter()

# In-memory store for user feedback (replace with a database in production)
feedback_store = []

@router.post("/feedback/submit", response_model=UserFeedback)
async def submit_feedback(feedback: UserFeedback):
    """Submit user feedback and associate it with a practice routine."""
    # Store feedback (in a real application, save to a database)
    feedback_store.append(feedback.dict())
    return feedback

@router.get("/feedback/{user_id}", response_model=List[UserFeedback])
async def get_feedback(user_id: int):
    """Retrieve all feedback for a specific user."""
    user_feedback = [f for f in feedback_store if f['user_id'] == user_id]
    if not user_feedback:
        raise HTTPException(status_code=404, detail="No feedback found for this user.")
    return user_feedback