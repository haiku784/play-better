from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Mock database for recordings and users
recordings_db = {"1": {"user_id": "user1", "exists": True}, "2": {"user_id": "user2", "exists": True}}
users_permissions = {"user1": True, "user2": False}

class ShareRequest(BaseModel):
    user_id: str
    recording_id: str
    platform: Optional[str] = None

@app.post("/share")
async def share_gameplay_session(request: ShareRequest):
    # Validate user permissions
    if not users_permissions.get(request.user_id, False):
        raise HTTPException(status_code=403, detail="User does not have permission to share recordings.")
    
    # Check if recording exists
    recording = recordings_db.get(request.recording_id)
    if not recording or not recording['exists']:
        raise HTTPException(status_code=404, detail="Recording not found.")
    
    # Generate shareable link (mock implementation)
    shareable_link = f"https://www.example.com/recordings/{request.recording_id}?platform={request.platform}"
    
    return {"message": "Sharing successful!", "link": shareable_link}