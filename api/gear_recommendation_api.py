from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

# Define a model for user preferences
class UserPreferences(BaseModel):
    activity_type: str
    budget: float
    preferred_brands: Optional[List[str]] = None

# Dummy database of gear recommendations
gear_database = [
    {'name': 'Mountain Bike', 'activity_type': 'cycling', 'price': 1200, 'brand': 'Brand A'},
    {'name': 'Running Shoes', 'activity_type': 'running', 'price': 150, 'brand': 'Brand B'},
    {'name': 'Hiking Backpack', 'activity_type': 'hiking', 'price': 100, 'brand': 'Brand C'},
    {'name': 'Surfboard', 'activity_type': 'surfing', 'price': 500, 'brand': 'Brand D'},
]

app = FastAPI()

@app.post("/recommendations/", response_model=List[dict])
async def get_gear_recommendations(preferences: UserPreferences):
    # Filter gear based on user preferences
    recommendations = [gear for gear in gear_database 
                       if gear['activity_type'] == preferences.activity_type 
                       and gear['price'] <= preferences.budget 
                       and (not preferences.preferred_brands or gear['brand'] in preferences.preferred_brands)]

    # If no recommendations found, return an error
    if not recommendations:
        raise HTTPException(status_code=404, detail="No gear found matching your preferences")
    return recommendations
