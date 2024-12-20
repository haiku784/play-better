from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from .database import get_db
from .models import VideoMetadata
from .validators.video_metadata_validator import VideoMetadataValidator

router = APIRouter()

@router.post('/upload_video')
async def upload_video(file: UploadFile = File(...), metadata: VideoMetadataValidator = Depends(), db: Session = Depends(get_db)):
    # Check for file size limit (e.g., 10MB)
    if file.file._file.readable() and file.spool_size > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail='File too large')

    # Save file and metadata to database
    try:
        # Process file upload logic here
        video_meta = VideoMetadata(**metadata.dict())
        db.add(video_meta)
        db.commit()
        return {'message': 'Video uploaded successfully!'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
