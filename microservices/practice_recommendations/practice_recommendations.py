from fastapi import FastAPI

app = FastAPI()

@app.get('/practice-recommendations/')
def practice_recommendations(skill_level: int):
    return {'recommendations': []}