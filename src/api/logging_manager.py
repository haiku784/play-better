from fastapi import FastAPI, Request
from .error_logger import log_error, log_alert

app = FastAPI()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        log_error(str(e))  # Log any errors that occur during request processing
        return JSONResponse(content={'detail': 'Internal Server Error'}, status_code=500)

# Example of logging a system alert
def some_system_operation():
    log_alert('A significant system event occurred.')
