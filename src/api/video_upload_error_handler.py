from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

async def video_upload_error_handler(request: Request, exc: Exception):
    """
    Handles errors that occur during the video upload process.
    Returns a structured JSON error response.
    """
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)}
    )
