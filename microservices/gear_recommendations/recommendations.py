from fastapi import FastAPI

app = FastAPI()

@app.get('/recommend-gear/')
def recommend_gear(player_preferences: dict):
    return {'gear': []}