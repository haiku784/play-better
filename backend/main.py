from fastapi import FastAPI
from fastapi.responses import JSONResponse

# Create an instance of the FastAPI application
app = FastAPI()

# Sample data for demonstration
sample_data = {
    "message": "Hello, World!",
    "platforms": ["Windows", "macOS", "Linux"]
}

@app.get("/api/data")
async def get_data():
    """Endpoint to get sample data compatible with different OS requests."""
    return JSONResponse(content=sample_data)

@app.get("/")
async def root():
    """Root endpoint returning a welcome message."""
    return JSONResponse(content={"message": "Welcome to the FastAPI application!"})
