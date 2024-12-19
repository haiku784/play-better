from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Defining the data model for user behavior
class UserBehavior(BaseModel):
    user_id: int
    activity: str
    score: float

# Create FastAPI instance
app = FastAPI()

# Mock database for storing user behaviors
mock_database = []

# API endpoint to generate recommendations based on user behavior
@app.post("/recommendations/")
async def generate_recommendations(user_behavior: UserBehavior):
    # Store user behavior in mock database
    mock_database.append(user_behavior)
    recommendations = []

    # Example logic for recommendations based on activity score
    if user_behavior.score > 75:
        recommendations.append("Recommendation A")
    elif user_behavior.score > 50:
        recommendations.append("Recommendation B")
    else:
        recommendations.append("Recommendation C")

    return {"user_id": user_behavior.user_id, "recommendations": recommendations}

# API endpoint to fetch all stored behaviors (for testing purposes)
@app.get("/behaviors/")
async def get_behaviors():
    return mock_database
