from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ExportStatusRequest(BaseModel):
    exportId: str

class ExportStatusResponse(BaseModel):
    isComplete: bool
    progress: int
    filePath: str = None
    errorMessage: str = None

@router.post('/video/status', response_model=ExportStatusResponse)
async def check_export_status(request: ExportStatusRequest):
    """Checks the status of the video export process."""
    # Simulate checking export process
    export_status = {'isComplete': True, 'progress': 100, 'filePath': '/exports/video.mp4', 'errorMessage': None}  # Example data
    return ExportStatusResponse(**export_status)

