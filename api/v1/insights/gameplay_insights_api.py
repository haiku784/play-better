from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Insight(BaseModel):
    user_id: str
    game_id: str
    insights: dict

@app.post('/api/insights')
def send_insights(insight: Insight):
    # Process the insight data
    return {'message': 'Insights received successfully!'}

@app.get('/api/insights/{user_id}')
def get_insights(user_id: str):
    # Fetch insights for the user
    return {'user_id': user_id, 'insights': []}