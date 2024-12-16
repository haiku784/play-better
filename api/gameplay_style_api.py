from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Define a model for user gameplay preferences
class GameplayStyle(BaseModel):
    user_id: int
    style: str  # e.g., 'aggressive', 'defensive', 'strategic'

# In-memory storage for gameplay preferences
preferences_storage = {}

@app.post("/submit-preference/")
async def submit_preference(preference: GameplayStyle):
    # Check if user_id already has a preference
    if preference.user_id in preferences_storage:
        raise HTTPException(status_code=400, detail="User's gameplay style already submitted.")
    
    # Store the gameplay preference
    preferences_storage[preference.user_id] = preference.style
    return {"message": "Gameplay preference submitted successfully!"}

@app.get("/get-preference/{user_id}")
async def get_preference(user_id: int):
    # Retrieve the user's gameplay preference
    if user_id not in preferences_storage:
        raise HTTPException(status_code=404, detail="User not found.")
    return {"user_id": user_id, "style": preferences_storage[user_id]}