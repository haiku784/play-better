from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

# Importing a placeholder for a video metrics service
from src.services.video_metrics_service import VideoMetricsService

app = FastAPI()

# Define the model for video metrics response
class VideoMetric(BaseModel):
    session_id: str
    duration: int  # Duration in seconds
    resolution: str
    frame_rate: float

class VideoMetricsResponse(BaseModel):
    metrics: List[VideoMetric]

# Dependency injection to get metrics service
video_metrics_service = VideoMetricsService()

@app.get("/api/video-metrics/{session_id}", response_model=VideoMetricsResponse)
async def get_video_metrics(session_id: str, limit: Optional[int] = None):
    """
    Retrieve processed video metrics for a given session ID.

    Args:
        session_id (str): The unique identifier for the video session.
        limit (Optional[int]): The maximum number of metrics to return.

    Returns:
        VideoMetricsResponse: A response containing a list of video metrics.
    """
    try:
        metrics = video_metrics_service.get_metrics_by_session(session_id, limit)
        if not metrics:
            raise HTTPException(status_code=404, detail="Metrics not found")
        return VideoMetricsResponse(metrics=metrics)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
