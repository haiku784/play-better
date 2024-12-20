from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from datetime import datetime
from .performance_metrics_extractor import PerformanceMetricsExtractor

class PerformanceMetricsLoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.metrics_extractor = PerformanceMetricsExtractor()

    async def dispatch(self, request: Request, call_next):
        start_time = datetime.now()  # Start time for the request
        response: Response = await call_next(request)  # Process the request
        end_time = datetime.now()  # End time for the request

        # Log the request time
        self.metrics_extractor.log_request_time(start_time, end_time)

        return response  # Return the response to the client

