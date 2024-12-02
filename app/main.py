from fastapi import FastAPI, HTTPException
app = FastAPI()
@app.get('/recommendations')
def get_recommendations(player_id: int): return {'message': 'Recommendations for player.'}