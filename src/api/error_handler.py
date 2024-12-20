from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse

class ErrorHandlingMiddleware:
    def __init__(self, app: FastAPI):
        self.app = app

    async def __call__(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            return JSONResponse(content={'detail': str(e)}, status_code=500)
