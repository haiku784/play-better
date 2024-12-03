from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Recommendation(BaseModel):
    message: str

@app.get('/recommendations/', response_model=list[Recommendation])
def get_recommendations():
    return [
        Recommendation(message='Focus on aim training drills.'),
        Recommendation(message='Study professional player strategies.'),
        Recommendation(message='Review recorded gameplay to identify weaknesses.'),
        Recommendation(message='Adjust gear settings based on comfort and performance.')
    ]