from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Model for user input
class UserInput(BaseModel):
    usage_type: str
    budget: float
    preferred_brand: str = None

# Mock function to generate hardware recommendations based on input
def get_recommendations(usage_type: str, budget: float, preferred_brand: str):
    # Logic to determine the best hardware based on user input
    # This is a placeholder for actual recommendation logic
    recommendations = []
    if usage_type == "gaming" and budget >= 1000:
        recommendations = [
            "NVIDIA RTX 3080",
            "Intel Core i7"
        ]
    elif usage_type == "office" and budget >= 500:
        recommendations = [
            "Intel Core i5",
            "8GB RAM"
        ]
    else:
        recommendations = ["Upgrade your budget or change usage type"]
    return recommendations

@app.post("/recommendations/")
async def fetch_recommendations(user_input: UserInput):
    try:
        recommendations = get_recommendations(user_input.usage_type, user_input.budget, user_input.preferred_brand)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
