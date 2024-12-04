from fastapi import FastAPI

app = FastAPI()

@app.post('/analyze/')
def analyze(gameplay_data: dict):
    return {'strengths': [], 'weaknesses': []}