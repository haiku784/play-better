from fastapi import FastAPI

# Initialize the FastAPI application
app = FastAPI()

# Define a simple route
@app.get("/")
async def read_root():
    return {"Hello": "World"}

# Run the application using Uvicorn, typically with: uvicorn main:app --host 0.0.0.0 --port 8000
