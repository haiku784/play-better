from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Define the FastAPI application
app = FastAPI()

# Configure CORS settings to allow requests from frontend applications
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # Adjust this to restrict origins
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Define a path for health check
@app.get('/health')
def health_check():
    return {'status': 'ok'}

# Define routes for load balancer to route traffic
# This is a placeholder, the actual routing logic would be added here.
@app.get('/api/v1/resource/{resource_id}')
def handle_request(resource_id: int):
    return {'resource_id': resource_id}

# Run the application using Uvicorn or similar ASGI server
# To run: uvicorn main:app --host 0.0.0.0 --port 8000