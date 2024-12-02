from fastapi import FastAPI

app = FastAPI()

@app.get(\/gear/recommendations/\")
def get_gear_recommendations():
    # logic to retrieve gear recommendations
    return recommendations"