from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List
import video_processing_service

app = FastAPI()

@app.post("/api/video-analysis/")
async def analyze_video(file: UploadFile = File(...)) -> JSONResponse:
    """Endpoint to analyze video files.
    This endpoint accepts a video file and processes it for analysis.
    
    Args:
        file (UploadFile): The video file to be analyzed.
    
    Returns:
        JSONResponse: Analysis results and status.
    """
    try:
        # Call the video processing service to analyze the video
        analysis_result = await video_processing_service.analyze_video(file)
        return JSONResponse(content={"status": "success", "data": analysis_result})
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)