from fastapi import FastAPI
from llama import analyze_gameplay_data

app = FastAPI()

@app.get('/insights')
def get_insights():
    gameplay_data = fetch_gameplay_data()
    insights = analyze_gameplay_data(gameplay_data)
    return insights