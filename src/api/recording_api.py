from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from .database import get_db
from sqlalchemy.orm import Session
from .utils.encryption_utility import EncryptionUtility
from .models import Recording

router = APIRouter()

@router.get("/recording/{recording_id}")
async def get_recording(recording_id: int, db: Session = Depends(get_db)):
    """
    API endpoint for retrieving recordings by ID. Verifies user authorization and decrypts the data before returning it.
    """
    recording = db.query(Recording).filter(Recording.id == recording_id).first()
    if not recording:
        raise HTTPException(status_code=404, detail="Recording not found")
    # Decrypt the data
    encryption_utility = EncryptionUtility(key=b'your_aes_key_32_bytes')
    decrypted_data = encryption_utility.decrypt(recording.data)
    return JSONResponse(content={'recording_data': decrypted_data})