from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class UserFeedback(BaseModel):
    user_id: str
    gear_id: str
    rating: int
    comments: str

class RecommendationResponse(BaseModel):
    recommendations: List[str]

@app.post('/feedback', response_model=RecommendationResponse)
async def submit_feedback(feedback: UserFeedback):
    # Validate the rating
    if feedback.rating < 1 or feedback.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    # Store feedback in MongoDB (logic to connect to DB and save omitted for brevity)
    # Example: await db.feedback.insert_one(feedback.dict())

    # Generate recommendations based on feedback (placeholder logic)
    recommendations = generate_recommendations(feedback)
    return RecommendationResponse(recommendations=recommendations)

def generate_recommendations(feedback: UserFeedback) -> List[str]:
    # Placeholder logic for generating recommendations based on feedback
    return ["Gear1", "Gear2", "Gear3"]