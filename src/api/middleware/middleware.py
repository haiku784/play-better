from fastapi import Request, FastAPI
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class LoggingMiddleware:
    def __init__(self, app: FastAPI):
        self.app = app

    async def __call__(self, request: Request, call_next):
        start_time = time.time()  # Record start time
        response = await call_next(request)  # Process the request
        duration = time.time() - start_time  # Calculate duration
        # Log the request method, URL, status code, and duration
        logging.info(f"{request.method} {request.url} - Status: {response.status_code} - Duration: {duration:.2f} seconds")
        return response

# Create a FastAPI app
app = FastAPI()
# Add the logging middleware to the app
app.add_middleware(LoggingMiddleware)