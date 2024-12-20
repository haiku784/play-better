from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse

class ErrorHandlerMiddleware:
    def __init__(self, app: FastAPI):
        self.app = app

    async def __call__(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            return JSONResponse(status_code=500, content={'message': str(e)})

# Usage in the FastAPI application
# app = FastAPI()
# app.add_middleware(ErrorHandlerMiddleware)