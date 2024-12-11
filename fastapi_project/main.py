from fastapi import FastAPI

# Create an instance of the FastAPI application
app = FastAPI()

# Define a simple GET endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI application!"}

# Run the application with 'uvicorn main:app --reload' to test it locally.